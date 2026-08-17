"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownCircleIcon,
  ArrowRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Footer from "./projects/shared-components/footer";
import { ScalableHeroMontage } from "./projects/shared-components/scalable-hero-montage";
import { IconB2B, IconCreator, IconAdTech } from "./components/skill-icons";

const HERO_ORANGE = "#D2740E";

type SkillPoint = { text: string; note?: string };
type Skill = {
  id: string;
  label: string;
  accent: string;
  color: string;
  spin: string;
  Icon: (props: { className?: string; style?: React.CSSProperties }) => React.JSX.Element;
  points: SkillPoint[];
};

const SKILLS: Skill[] = [
  {
    id: "b2b",
    label: "B2B SaaS",
    accent: "Application",
    color: "#E29D62",
    spin: "spin-slow 8s linear infinite",
    Icon: IconB2B,
    points: [
      { text: "Identity & Access Management" },
      { text: "Media & Advertising Platform" },
      { text: "Data-Rich Workflow" },
      { text: "Technical Administration" },
      { text: "AI & Cloud Application" },
    ],
  },
  {
    id: "creator",
    label: "Creator Tools",
    accent: "",
    color: "#8EB1C7",
    spin: "spin-ccw 10s linear infinite",
    Icon: IconCreator,
    points: [
      { text: "Amazon Music & Podcast" },
      { text: "Podcast Publishing", note: "saved user 7000+ hours in the 1st month" },
      { text: "Ad Insertion In Audio" },
      { text: "Advanced Media Management" },
    ],
  },
  {
    id: "adtech",
    label: "AdTech",
    accent: "Advertising",
    color: "#9CB993",
    spin: "spin-slow 11s linear infinite",
    Icon: IconAdTech,
    points: [
      { text: "Amazon Ads" },
      { text: "Monetization Acceleration", note: "reduced ad review time by 92%" },
      { text: "Precise Ad Targeting" },
      { text: "AdTech Optimization" },
    ],
  },
];

function useTyping(suffix: string, startDelay = 900) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let i = 0;
    let tid: ReturnType<typeof setTimeout>;
    const typeNext = () => {
      if (i >= suffix.length) { setDone(true); return; }
      const ch = suffix[i];
      setTyped(suffix.slice(0, i + 1));
      i++;
      const delay = ch === "," ? 140 + Math.random() * 80
                  : ch === "." ? 200 + Math.random() * 100
                  : 36 + Math.random() * 26;
      tid = setTimeout(typeNext, delay);
    };
    tid = setTimeout(typeNext, startDelay);
    return () => clearTimeout(tid);
  }, [triggered, suffix, startDelay]);

  return { ref, typed, done };
}

function useToggleReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Home() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const rExp1 = useReveal();
  const rExp2 = useReveal();
  const rSlogan = useReveal();
  const rProjectTitle = useToggleReveal();

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [heroScale, setHeroScale] = useState(0.95);
  const [heroRadius, setHeroRadius] = useState(0);
  const [navFaded, setNavFaded] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  // hero colour flip works at any scroll position; the nav only follows it
  // while it is still sitting on the hero background
  const skillMode = activeSkill !== null;
  const navSkillMode = skillMode && !navFaded;
  const heroRef = useRef<HTMLElement>(null);
  const chipRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Circle of color that grows out of the hovered chip until it fills the hero
  const [ripple, setRipple] = useState({ x: 0, y: 0, r: 0 });
  const [rippleOn, setRippleOn] = useState(false);
  // true when one chip hands over to another: the page is already orange, so
  // the labels can swap colour immediately instead of waiting for a wave
  const [chipHandover, setChipHandover] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSkill = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setChipHandover(activeSkill !== null);
    const hero = heroRef.current;
    const chip = chipRefs.current[id];
    if (hero && chip) {
      const heroRect = hero.getBoundingClientRect();
      const chipRect = chip.getBoundingClientRect();
      const scale = heroRect.width / hero.offsetWidth || 1;
      const w = hero.offsetWidth;
      const h = hero.offsetHeight;
      const x = (chipRect.left + chipRect.width / 2 - heroRect.left) / scale;
      const y = (chipRect.top + chipRect.height / 2 - heroRect.top) / scale;
      const r = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) * 1.05;
      setRipple({ x, y, r });
    }
    setActiveSkill(id);
  };

  // short grace period so moving between two chips doesn't flash back to default
  const closeSkill = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setActiveSkill(null);
      setChipHandover(false);
    }, 160);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!skillMode) {
      setRippleOn(false);
      return;
    }
    // rAF gives the browser one frame at scale(0) so the transition runs;
    // the timer is a fallback for when rAF is paused (backgrounded tab)
    const raf = requestAnimationFrame(() => setRippleOn(true));
    const timer = setTimeout(() => setRippleOn(true), 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [skillMode]);

  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 500, 1);
      setHeroScale(0.95 - progress * 0.18);
      setHeroRadius(progress * 28);
      setNavFaded(window.scrollY > 10);
      // only drop the skill state once the hero is basically off screen
      if (window.scrollY > window.innerHeight * 0.8) setActiveSkill(null);
      const projEl = document.querySelector('main#projects') as HTMLElement;
      if (projEl) setNavOnDark(window.scrollY + 80 > projEl.offsetTop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // text flips only once the colour wave has swept past it, and flips back
  // just after it starts retreating
  const textTransition = skillMode
    ? "color 450ms ease 650ms"
    : "color 350ms ease 150ms";

  // chip labels sit at the wave's origin, so they only need a short lead —
  // and none at all when swapping between chips on an already-orange page
  const labelTransition = skillMode
    ? chipHandover
      ? "color 160ms ease"
      : "color 220ms ease 220ms"
    : "color 220ms ease 100ms";

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="transition-colors duration-500"
      style={{
        backgroundColor: navFaded ? "#ffffff" : navSkillMode ? HERO_ORANGE : "#F3E7C4",
        transitionDelay: navSkillMode ? "900ms" : "0ms",
      }}
    >
      {/* Custom project hover cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-200 ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{ left: cursorPos.x, top: cursorPos.y, transform: "translate(-50%, -50%)" }}
      >
        <div className="bg-gray-900 text-white rounded-full px-4 py-2.5 flex items-center gap-2 text-sm font-semibold whitespace-nowrap shadow-lg">
          👁 View
        </div>
      </div>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${navFaded ? 'px-4 md:px-20 pt-4 pb-1' : 'px-4 md:px-20 pt-2 pb-0'}`}>
        <div
          className={`flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-500 ${navFaded ? 'rounded-2xl bg-white/50 backdrop-blur-md' : 'rounded-none'}`}
          style={
            navFaded
              ? undefined
              : {
                  backgroundColor: navSkillMode ? HERO_ORANGE : "#F3E7C4",
                  transitionDelay: navSkillMode ? "900ms" : "0ms",
                }
          }
        >
          <Link
            href="/"
            className={`text-4xl font-clash-grotesk font-bold transition-colors duration-500 ${navSkillMode ? 'text-white hover:text-white/70 delay-[400ms]' : 'text-golden-anchor hover:text-beige-anchor'}`}
          >
            Di.X
          </Link>
          <div className="flex items-center justify-center gap-6 md:gap-16">
            <a
              className={`text-md font-medium transition-colors duration-500 cursor-pointer ${skillMode ? 'text-white hover:text-white/70' : 'text-black hover:text-golden-anchor'}`}
              onClick={handleScrollToProjects}
            >
              Projects
            </a>
            <Link
              href="/gallery"
              className={`text-md font-medium transition-colors duration-500 ${navSkillMode ? 'text-white hover:text-white/70 delay-[400ms]' : 'text-black hover:text-golden-anchor'}`}
            >
              Photos
            </Link>
            <Link
              href="mailto:xiaodishaw@gmail.com"
              className={`text-md font-medium transition-colors duration-500 ${navSkillMode ? 'text-white hover:text-white/70 delay-[400ms]' : 'text-black hover:text-golden-anchor'}`}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="sticky top-0 z-[1] min-h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden"
        style={{
          transform: `scale(${heroScale})`,
          borderRadius: `${heroRadius}px`,
          transformOrigin: "top center",
          backgroundColor: "#F3E7C4",
          color: skillMode ? "#ffffff" : "#000000",
          transition: textTransition,
        }}
      >
        {/* Color wave that expands from the hovered chip */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            left: ripple.x - ripple.r,
            top: ripple.y - ripple.r,
            width: ripple.r * 2,
            height: ripple.r * 2,
            backgroundColor: HERO_ORANGE,
            transform: `scale(${rippleOn ? 1 : 0})`,
            transition: rippleOn
              ? "transform 1200ms cubic-bezier(0.45, 0.05, 0.2, 1)"
              : "transform 700ms cubic-bezier(0.5, 0, 0.9, 0.6)",
          }}
        />

        {/* the lift is permanent, not hover-driven: moving the chips under a
            resting cursor would fire pointerleave and flicker the hover state */}
        <div className="relative z-10 w-full flex flex-col items-center md:-translate-y-10 [@media(min-width:768px)_and_(max-height:820px)]:-translate-y-[4.5rem]">
        <div className="text-center w-full">
          <h1 className="text-5xl md:text-8xl font-semibold leading-tight tracking-tighter">
            Hello,{" "}
            <span
              className="animate-float inline-block align-middle mx-1 md:mx-3 relative w-[104px] h-[104px] md:w-[170px] md:h-[170px]"
              style={{ verticalAlign: "middle" }}
            >
              {/* Spinning circular text */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 170 170"
              >
                <defs>
                  <path id="atp" d="M85,85 m-77,0 a77,77 0 1,1 154,0 a77,77 0 1,1 -154,0" />
                </defs>
                <text
                  fontSize="8.5"
                  letterSpacing="3.5"
                  fill={skillMode ? "#ffffff" : "#d9730b"}
                  fontWeight="500"
                  style={{ transition: textTransition.replace("color", "fill") }}
                >
                  <textPath href="#atp">SENIOR UX DESIGNER ✦ SENIOR UX DESIGNER ✦ </textPath>
                </text>
              </svg>
              {/* Avatar image */}
              <span className="absolute rounded-full overflow-hidden inset-3 md:inset-5">
                <Image src="/DiHead.png" alt="Di's Headshot" fill className="object-cover" />
                <span className="absolute inset-0 rounded-full bg-orange-400 opacity-60 z-[-1]" />
              </span>
            </span>{" "}
            I'm Diii
          </h1>

          <h2 className="text-5xl md:text-8xl font-semibold mt-4 md:mt-6 tracking-tighter">
            I untangle{" "}
            <span className="inline-block align-middle relative w-32 h-16 md:w-60 md:h-20 mx-2 rounded-full overflow-hidden">
              <Image
                src="/photo2.jpg"
                alt="Design texture"
                fill
                className="object-cover"
              />
            </span>{" "}
            design problems.
          </h2>
        </div>

        {/* Skills: three chips that open one detail list at a time on hover */}
        <div className="mt-10 md:mt-28 [@media(min-width:768px)_and_(max-height:820px)]:mt-12 w-full flex flex-col items-center">
          <p
            className={`text-base md:text-lg text-center transition-opacity duration-300 ${
              skillMode ? "opacity-0" : "opacity-100"
            }`}
          >
            With background in Engineering and HCI, I design at the systems level across:
          </p>

          <div className="mt-5 w-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center gap-y-2 md:gap-x-8">
            {SKILLS.map(({ id, label, accent, color, spin, Icon, points }) => {
              const isActive = activeSkill === id;
              return (
                <div
                  key={id}
                  ref={(el) => {
                    chipRefs.current[id] = el;
                  }}
                  // hover only for real pointers — on touch a tap would fire
                  // enter and click together and cancel itself out
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") openSkill(id);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") closeSkill();
                  }}
                  onClick={() => (isActive ? closeSkill() : openSkill(id))}
                  className="relative w-fit select-none cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 ${
                      isActive ? "bg-white scale-[1.03]" : "bg-transparent"
                    }`}
                  >
                    <Icon className="w-9 h-9 shrink-0" style={{ color, animation: spin }} />
                    <span
                      className="text-xl whitespace-nowrap"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        color: skillMode && !isActive ? "#ffffff" : "#000000",
                        transition: labelTransition,
                      }}
                    >
                      {label}
                      {accent && (
                        <em className="ml-1.5 font-normal italic">{accent}</em>
                      )}
                    </span>
                  </div>

                  {/* Detail list — only one open at a time */}
                  <div
                    className={`w-max pt-4 md:absolute md:left-0 md:top-full transition-opacity duration-300 ${
                      isActive
                        ? "block opacity-100"
                        : "hidden md:block opacity-0 pointer-events-none"
                    }`}
                  >
                    {/* pl matches the chip's icon centre (px-5 + half of the 36px icon) */}
                    <ul className="pl-[30px] pr-4 space-y-2 text-left">
                      {points.map(({ text, note }, i) => (
                        <li
                          key={text}
                          className={`flex items-start gap-3 text-white transition-all duration-500 ease-out ${
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                          style={{ transitionDelay: isActive ? `${260 + i * 70}ms` : "0ms" }}
                        >
                          {/* icon box matches the first line's height so the
                              two sit on the same centre line */}
                          <span className="flex h-[22px] items-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-base leading-snug whitespace-nowrap">
                            {text}
                            {note && (
                              <em className="block text-sm text-white/90 whitespace-normal">
                                {note}
                              </em>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleScrollToProjects}
          className={`mt-8 md:mt-20 px-8 py-4 rounded-full border-2 border-golden-anchor text-golden-anchor text-md font-bold hover:bg-golden-anchor hover:text-white transition-opacity duration-300 cursor-pointer flex items-center gap-2 ${
            skillMode ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          See My Work
          <ArrowDownCircleIcon className="w-6 h-6 ml-2" />
        </button>
        </div>{/* end z-10 content wrapper */}

      </section>

      {/* Experience Section */}
      <section className="sticky top-0 z-[2] w-full flex flex-col justify-center items-center py-16 rounded-t-3xl overflow-hidden" style={{ backgroundColor: '#F1F0ED' }}>
        <div className="max-w-6xl w-full px-6 text-left">
          {/* Label stacked above slogan */}
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">My Experience</span>
          <div
            ref={rSlogan.ref}
            className={`mb-14 transition-all duration-700 ease-out ${rSlogan.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-5xl md:text-6xl font-semibold text-gray-900 leading-[1.05]" style={{ fontFamily: 'var(--font-fraunces)' }}>
              Navigating ambiguity, scaling impact.
            </p>
          </div>
          <div className="flex flex-col md:flex-row text-left gap-8">
            <div
              ref={rExp1.ref}
              style={{ transitionDelay: "0ms" }}
              className={`flex-1 rounded-lg pr-6 py-6 transition-all duration-700 ease-out ${
                rExp1.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Image src="/logo-amazon.png" alt="Amazon Logo" width={100} height={40} className="object-cover mb-4" />
              <p>
                I currently work at Amazon Ads for the podcast industry, which
                offers a comprehensive suite of enterprise-level podcast
                publishing, distribution, and monetization tools. I've optimized
                the publisher experience and streamlined campaign workflows to
                enable precise and dynamic ad targeting.
              </p>
            </div>
            <div
              ref={rExp2.ref}
              style={{ transitionDelay: "150ms" }}
              className={`flex-1 rounded-lg pr-6 py-6 transition-all duration-700 ease-out ${
                rExp2.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Image src="/logo-saviynt.png" alt="Saviynt Logo" width={100} height={40} className="object-cover mb-4" />
              <p>
                As founding designer at{" "}
                <a href="https://saviynt.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-golden-anchor transition">
                  Saviynt, Inc.
                </a>{" "}
                , I led full-platform redesigns and initiated most major
                features — from core Identity and Access Management (IAM)
                products to Cloud Privileged Access Management. Saviynt is a
                leading SaaS company in the Identity Governance and
                Administration (IGA) space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <main
        id="projects"
        className="sticky top-0 z-[3] min-h-screen flex flex-col items-center bg-[#3D3530] justify-center rounded-t-3xl overflow-hidden"
      >
        <div
          ref={projectsRef}
          className="relative max-w-6xl w-full flex flex-col items-center px-6"
        >
          <section
            id="target-projects"
            className="flex flex-col gap-8 max-w-6xl w-full py-20"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-2 block">My Projects</span>

            {/* Scalable Architecture */}
            <div
              ref={r5.ref}
              style={{ transitionDelay: "0ms" }}
              className={`transition-all duration-700 ease-out ${
                r5.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link href="/projects/project-access?target=scalable-architecture" className="group block cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}>
                <div className="relative bg-white rounded-2xl p-8 pr-14 flex flex-col md:flex-row items-stretch md:h-[460px] w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <ScalableHeroMontage className="rounded-lg w-full h-48 md:h-full group-hover:scale-[1.02] transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%] flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Re-architect Podcast Management & Monetization Platform (AI-Assisted)
                    </h2>
                    <p className="text-gray-600 text-left">
                      Won 1st place at an internal hackathon — redesigned the platform IA from a fragmented profile picker to a task-based workspace hub.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-4">
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        Vibe Coding
                      </span>
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        SaaS Architecture
                      </span>
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        Product Strategy
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-golden-anchor font-semibold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Case Study <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Brand Approval */}
            <div
              ref={r1.ref}
              style={{ transitionDelay: "80ms" }}
              className={`transition-all duration-700 ease-out ${
                r1.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                href={`/projects/project-access?target=brand-approval`}
                className="group block cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <div className="relative bg-white rounded-2xl p-8 pr-14 flex flex-col md:flex-row items-stretch md:h-[460px] w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-BrandApproval.png"
                      alt="Project Brand Approval"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-48 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%] flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Brand Approval Flow to Automate Ad Delivery on Podcasts
                    </h2>
                    <p className="text-gray-600 text-left">
                      Cut approval time from 25+ hours to under 2 hours per
                      month, enabled real-time brand activation, and eliminated
                      manual errors.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-4">
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        Amazon
                      </span>
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        Monetization
                      </span>
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        Advertising
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-golden-anchor font-semibold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Case Study <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Episode Publishing */}
            <div
              ref={r2.ref}
              style={{ transitionDelay: "160ms" }}
              className={`transition-all duration-700 ease-out ${
                r2.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                href={`/projects/project-access?target=episode`}
                className="group block cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <div className="relative bg-white rounded-2xl p-8 pr-14 flex flex-col md:flex-row items-stretch md:h-[460px] w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-episode.png"
                      alt="Project Episode Publishing"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-48 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%] flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Episode Publishing Experience Redesign
                    </h2>
                    <p className="text-gray-600 text-left">
                      Redesigned the episode publishing experience to support
                      self-serve onboarding.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-4">
                      <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                        Amazon
                      </span>
                      <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                        Podcast
                      </span>
                      <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                        Creator Experience
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-purple-anchor font-semibold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Case Study <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Risk Detection */}
            <div
              ref={r3.ref}
              style={{ transitionDelay: "240ms" }}
              className={`transition-all duration-700 ease-out ${
                r3.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                href={`/projects/risk-detection`}
                className="group block cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <div className="bg-white rounded-2xl p-8 pr-14 flex flex-col md:flex-row items-stretch md:h-[460px] w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-risk.png"
                      alt="Project Risk Detection"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-48 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%] flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Discovering the Escalation Use Case in Risk-Enabled Access
                      Requests
                    </h2>
                    <p className="text-gray-600 text-left">
                      Risk detection surfaced a second persona — Risk Owners —
                      and an escalation use case covering 20–30% of reviews.
                      Designed one review flow that deepens on demand, with a
                      temporary hand-off that always comes back.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-4">
                      <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                        SaaS
                      </span>
                      <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                        B2B
                      </span>
                      <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                        Access Management, IGA & IAM
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-purple-anchor font-semibold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Case Study <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* App Onboarding */}
            <div
              ref={r4.ref}
              style={{ transitionDelay: "320ms" }}
              className={`transition-all duration-700 ease-out ${
                r4.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link href={`/projects/app-onboard`} className="group block cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}>
                <div className="bg-white rounded-2xl p-8 pr-14 flex flex-col md:flex-row items-stretch md:h-[460px] w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-aob-1.png"
                      alt="Project Application Onboarding"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-48 md:h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%] flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold mb-4">
                      Onboard Applications with Zero Coding Required
                    </h2>
                    <p className="text-gray-600 text-left">
                      Introduced visual UI alternatives to technical inputs such
                      as code and policy configurations.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-4">
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        SaaS
                      </span>
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        B2B
                      </span>
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        Admin Function
                      </span>
                      <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                        IGA & IAM
                      </span>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-golden-anchor font-semibold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Case Study <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>

        <Footer customValue="max-w-6xl" />
      </main>
    </div>
  );
}
