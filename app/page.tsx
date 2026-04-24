"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Footer from "./projects/shared-components/footer";

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
      const projEl = document.querySelector('main#projects') as HTMLElement;
      if (projEl) setNavOnDark(window.scrollY + 80 > projEl.offsetTop);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Custom project hover cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-200 ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{ left: cursorPos.x, top: cursorPos.y, transform: "translate(-50%, -50%)" }}
      >
        <div className="bg-gray-900 text-white rounded-full px-4 py-2.5 flex items-center gap-2 text-sm font-semibold whitespace-nowrap shadow-lg">
          👁 View
        </div>
      </div>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${navFaded ? 'px-6 pt-4 pb-1' : 'px-0 pt-0 pb-0'}`}>
        <div className={`flex items-center justify-between px-8 py-3 transition-all duration-300 ${navFaded ? 'rounded-2xl bg-[#F3E7C4]/60 backdrop-blur-md' : 'rounded-none bg-[#F3E7C4]'} ${navOnDark && navFaded ? 'bg-[#F3E7C4]/40' : ''}`}>
          <Link
            href="/"
            className="text-4xl font-clash-grotesk text-golden-anchor font-bold hover:text-beige-anchor"
          >
            Di.X
          </Link>
          <div className="flex items-center justify-center gap-16">
            <a
              className="text-md font-medium text-black hover:text-golden-anchor transition cursor-pointer"
              onClick={handleScrollToProjects}
            >
              Projects
            </a>
            <Link
              href="/gallery"
              className="text-md font-medium text-black hover:text-golden-anchor transition"
            >
              Photos
            </Link>
            <Link
              href="mailto:xiaodishaw@gmail.com"
              className="text-md font-medium text-black hover:text-golden-anchor transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="sticky top-0 z-[1] min-h-screen w-full bg-[#F3E7C4] flex flex-col justify-center items-center px-6 text-gray-900 overflow-hidden"
        style={{
          transform: `scale(${heroScale})`,
          borderRadius: `${heroRadius}px`,
          transformOrigin: "top center",
        }}
      >

        <div className="relative z-10 w-full flex flex-col items-center">
        <div className="text-center w-full">
          <h1 className="text-6xl md:text-8xl font-semibold leading-tight tracking-tighter">
            Hello,{" "}
            <span
              className="animate-float inline-block align-middle mx-3 relative"
              style={{ width: 170, height: 170, verticalAlign: "middle" }}
            >
              {/* Spinning circular text */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 170 170"
              >
                <defs>
                  <path id="atp" d="M85,85 m-77,0 a77,77 0 1,1 154,0 a77,77 0 1,1 -154,0" />
                </defs>
                <text fontSize="8.5" letterSpacing="3.5" fill="#d9730b" fontWeight="500">
                  <textPath href="#atp">SENIOR UX DESIGNER ✦ SENIOR UX DESIGNER ✦ </textPath>
                </text>
              </svg>
              {/* Avatar image */}
              <span className="absolute rounded-full overflow-hidden" style={{ inset: 20 }}>
                <Image src="/DiHead.png" alt="Di's Headshot" fill className="object-cover" />
                <span className="absolute inset-0 rounded-full bg-orange-400 opacity-60 z-[-1]" />
              </span>
            </span>{" "}
            I'm Diii
          </h1>

          <h2 className="text-6xl md:text-8xl font-semibold mt-6 tracking-tighter">
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

        <div className="mt-8 max-w-2xl text-lg text-center text-gray-800 leading-relaxed space-y-4">
          <p>
            With a hybrid background in Information Engineering and HCI, I'm a
            user-centered designer with strong logical thinking and a
            system-level perspective.
          </p>
        </div>

        <button
          onClick={handleScrollToProjects}
          className="mt-24 px-8 py-4 rounded-full border-2 border-golden-anchor text-golden-anchor text-md font-bold hover:bg-golden-anchor hover:text-white transition cursor-pointer flex items-center gap-2"
        >
          See My Work
          <ArrowDownCircleIcon className="w-6 h-6 ml-2" />
        </button>
        </div>{/* end z-10 content wrapper */}

        {/* Marquee pinned to bottom of hero */}
        {(() => {
          const items = ["🎾 Tennis", "📷 Photography", "📚 Reading", "☕ Coffee", "🎨 Design", "🌱 Plants", "🍜 Noodles", "✈️ Travel"];
          const repeated = [...items, ...items];
          return (
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-golden-anchor py-3 z-10">
              <div className="flex animate-marquee whitespace-nowrap">
                {repeated.map((item, i) => (
                  <span key={i} className="text-sm font-medium text-white mx-6 shrink-0">
                    {item}
                    <span className="ml-6 text-white/40">◆</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
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
              Design clarity in complex systems, turn ambiguity into structured experience.
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
                Currently work at Amazon in the podcast industry —{" "}
                <a href="https://art19.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-golden-anchor transition">
                  ART19.com
                </a>{" "}
                who offers a comprehensive suite of enterprise-level hosting,
                distribution, and monetization tools. I optimized the publisher
                experience and streamlined campaign workflows to enable precise
                and dynamic audience targeting.
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
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">My Projects</span>

            {/* Brand Approval */}
            <div
              ref={r1.ref}
              style={{ transitionDelay: "0ms" }}
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
                <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-BrandApproval.png"
                      alt="Project Brand Approval"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%]">
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
              style={{ transitionDelay: "80ms" }}
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
                <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-episode.png"
                      alt="Project Episode Publishing"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%]">
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
              style={{ transitionDelay: "160ms" }}
              className={`transition-all duration-700 ease-out ${
                r3.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                href={`/projects/project-access?target=risk-detection`}
                className="group block cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-risk.png"
                      alt="Project Risk Detection"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%]">
                    <h2 className="text-2xl font-semibold mb-4">
                      Enhancing Access Requests with Risk Detection
                    </h2>
                    <p className="text-gray-600 text-left">
                      A key outcome was the discovery of two core personas:
                      People Managers and Risk Owners. Created a tailored
                      workflow that serves both use cases.
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
              style={{ transitionDelay: "240ms" }}
              className={`transition-all duration-700 ease-out ${
                r4.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Link href={`/projects/app-onboard`} className="group block cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}>
                <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center w-full group-hover:-translate-y-1 group-hover:shadow-xl transition-all duration-300">
                  <div className="flex-1 min-w-0 max-w-[600px] basis-[55%] mb-4 md:mb-0 md:mr-16 overflow-hidden rounded-lg">
                    <Image
                      src="/cover-aob-1.png"
                      alt="Project Application Onboarding"
                      width={600}
                      height={400}
                      className="rounded-lg w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 basis-[45%]">
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
    </>
  );
}
