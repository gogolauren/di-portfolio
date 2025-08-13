"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

export default function Home() {
  // Ref for scrolling to projects section
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <header className="w-full bg-beige-tint1 border-b border-beige-base">
        <nav className="max-w-6xl mx-auto flex items-center px-4 py-3">
          <div className="flex items-center justify-between w-full">
            <Link
              href="/"
              className="text-4xl font-clash-grotesk text-golden-anchor font-bold hover:text-beige-anchor"
            >
              Di.X
            </Link>
            <div className="flex items-center justify-center gap-16">
              <a
                className="text-md font-medium text-gray-800 hover:text-beige-anchor hover:underline transition cursor-pointer"
                onClick={handleScrollToProjects}
              >
                Projects
              </a>
              <Link
                href="mailto:xiaodishaw@gmail.com"
                className="text-md font-medium text-gray-800 hover:text-beige-anchor hover:underline transition"
              >
                Contact
              </Link>
              {/*<Link
                href="/contact"
                className="text-md font-medium text-gray-800 hover:text-beige-anchor hover:underline transition"
              >
                About
              </Link> */}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}

      {/* <section className="min-h-screen flex flex-col items-center justify-center text-gray-900 gap-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-center md:text-right">
              <h1 className="text-3xl font-extrabold mb-4">Hello,</h1>
              <p className="text-lg">D for Design,</p>
            </div>
            <Image
              src="/DiHead.png"
              alt="Di's Headshot"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold mb-4">I am Di</h1>
              <p className="text-lg">I for Ideas!</p>
            </div>
          </div>
          <button
            onClick={handleScrollToProjects}
            className="mt-8 px-8 py-4 rounded-full border-2 border-blue-dark text-blue-dark text-md font-bold hover:bg-blue-shade transition cursor-pointer"
          >
            See My Work
          </button>
        </section> */}

      <section className="min-h-screen w-full bg-gradient-to-b from-beige-tint1 via-beige-tint1 to-white flex flex-col justify-center items-center px-6 text-gray-900">
        {/* Heading */}
        <div className="text-center w-full">
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
            Hello,{" "}
            <span className="inline-block align-middle relative w-16 h-16 md:w-24 md:h-24 mx-2 rounded-full overflow-hidden">
              {/*<Image
                  src="/diphoto.jpg" // 替换成你的人物头像
                  alt="Di's Photo"
                  fill
                  className="object-cover"
                />*/}
              <Image
                src="/DiHead.png"
                alt="Di's Headshot"
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 rounded-full bg-orange-400 opacity-70 z-[-1]" />
            </span>{" "}
            I’m Diii
          </h1>

          <h2 className="text-5xl md:text-6xl font-semibold mt-6">
            I untangle{" "}
            <span className="inline-block align-middle relative w-32 h-16 md:w-60 md:h-20 mx-2 rounded-full overflow-hidden">
              <Image
                src="/photo2.jpg" // 替换成你喜欢的纹理背景
                alt="Design texture"
                fill
                className="object-cover"
              />
            </span>{" "}
            design problems.
          </h2>
        </div>

        {/* Paragraph */}
        <p className="mt-8 max-w-2xl text-lg text-center text-gray-800 leading-relaxed">
          With a hybrid background in Information Engineering and HCI, I’m a
          user-centered designer with strong logical thinking and a system-level
          perspective. <br /> My strength lies in designing complex systems —
          untangling logic, working with data-heavy workflows, simplifying
          technical processes, and navigating ambiguity with clarity.
        </p>

        {/* Social buttons 
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            {['Dribbble', 'Behance', 'Instagram'].map((label) => (
              <button
                key={label}
                className="border px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition"
              >
                {label}
              </button>
            ))}
          </div> */}
        <button
          onClick={handleScrollToProjects}
          className="mt-24 px-8 py-4 rounded-full border-2 border-golden-anchor text-golden-anchor text-md font-bold hover:bg-golden-anchor hover:text-white transition cursor-pointer flex items-center gap-2"
        >
          See My Work
          <ArrowDownCircleIcon className="w-6 h-6 ml-2" />
        </button>
      </section>

      {/* Projects Section with gradient background */}
      <main className="min-h-screen flex flex-col items-center bg-purple-tint1 justify-center px-4">
        <div
          ref={projectsRef}
          className="relative w-full flex flex-col items-center"
        >
          {/* Gradient Circles as background for projects only */}
          {/*<div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-[#f7f4de] to-[#d4c566] rounded-full opacity-40 blur-3xl top-[60px] left-[-200px]" />
            <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-[#D3D8EB] to-[#7B86A8] rounded-full opacity-70 blur-3xl top-[120px] left-[25%]" />
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-[#b0c4b1] to-[#4a5759] rounded-full opacity-30 blur-2xl top-[500px] left-[70%]" />
          </div>*/}

          <section
            id="target-projects"
            className="flex flex-col gap-8 max-w-6xl w-full py-20"
          >
            <h2 className="text-sm font-bold text-gray-700 font-[var(--font-clash-grotesk)]">
              My Projects
            </h2>
            <Link
              href={`/projects/project-access?target=brand-approval`}
              className="block"
            >
              <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center w-full">
                <Image
                  src="/cover-BrandApproval.png"
                  alt="Project Brand Approval"
                  width={600}
                  height={400}
                  className="rounded mb-4 md:mb-0 md:mr-16"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Brand Approval Flow to Automate Ad Delivery on Podcasts
                  </h2>
                  <p className="text-gray-900 text-center md:text-left">
                    Cut approval time from 25+ hours to under 2 hours per month,
                    enabled real-time brand activation, and eliminated manual
                    errors.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mt-4">
                    <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                      Amazon
                    </span>
                    <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                      Monetization{" "}
                    </span>
                    <span className="border border-beige-shade text-golden-anchor px-3 py-1 rounded-full text-sm">
                      Advertising
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href={`/projects/project-access?target=episode`}
              className="block"
            >
              <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center w-full">
                <Image
                  src="/cover-episode.png"
                  alt="Project Episodes Publishing"
                  width={600}
                  height={400}
                  className="rounded mb-4 md:mb-0 md:mr-16"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Episode Publishing Experience Redesign
                  </h2>
                  <p className="text-gray-900 text-center md:text-left">
                    Redesigned the episode publishing experience to support
                    self-serve onboarding.{" "}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mt-4">
                    <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                      Amazon
                    </span>
                    <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                      Podcast{" "}
                    </span>
                    <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                      Creator Experience
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={`/projects/risk-detection`} className="block">
              <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center w-full">
                <Image
                  src="/Risk-cover.png"
                  alt="Project risk detection"
                  width={600}
                  height={400}
                  className="rounded mb-4 md:mb-0 md:mr-16"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Enhancing Access Requests with Risk Detection
                  </h2>
                  <p className="text-gray-900 text-center md:text-left">
                    A key outcome was the discovery of two core personas: People
                    Managers and Risk Owners. Created a tailored workflow that
                    serves both use cases.{" "}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mt-4">
                    <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                      SaaS
                    </span>
                    <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                      B2B{" "}
                    </span>
                    <span className="border border-purple-base text-purple-anchor px-3 py-1 rounded-full text-sm">
                      Access Management
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        </div>
      </main>

      {/* Introduction Section */}
      <section className="w-full flex flex-col justify-center items-center bg-[#F6F7F1] pt-20 pb-8">
        <div className="max-w-6xl w-full px-6 text-left">
          <h2 className="text-sm font-bold mb-6 text-gray-700 font-[var(--font-clash-grotesk)]">
            My Experience
          </h2>
          <div className="flex flex-col md:flex-row text-left gap-8">
            <div className="flex-1 rounded-lg pr-6 py-6">
              <Image
                src="/logo-amazon.png"
                alt="Amazon Logo"
                width={100}
                height={40}
                className="object-cover mb-4"
              />
              <p>
                Currently work at Amazon in the podcast industry —{" "}
                <a
                  href="https://art19.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-golden-anchor transition"
                >
                  ART19.com
                </a>{" "}
                who offers a comprehensive suite of enterprise-level hosting,
                distribution, and monetization tools. I optimized the publisher
                experience and streamlined campaign workflows to enable precise
                and dynamic audience targeting.
              </p>
            </div>

            <div className="flex-1 rounded-lg p-6">
              <Image
                src="/logo-saviynt.png"
                alt="Saviynt Logo"
                width={100}
                height={40}
                className="object-cover mb-4"
              />
              <p>
                As founding designer at{" "}
                <a
                  href="https://saviynt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-golden-anchortransition"
                >
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

        {/* Footer */}
        <footer className="mt-12 text-gray-500 text-sm mb-4 text-center">
          &copy; {new Date().getFullYear()} Di Xiao. All rights
          reserved.&emsp;&emsp; Contact:{" "}
          <a
            href="mailto:hello@dixiao.com"
            className="underline text-gray-700 hover:text-golden-anchor transition"
          >
            xiaodishaw@gmail.com
          </a>
        </footer>
      </section>
    </>
  );
}
