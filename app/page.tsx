"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Ref for scrolling to projects section
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <header className="w-full bg-beige-tint1 dark:bg-black border-b border-beige-base dark:border-gray-800">
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
                className="text-md font-medium text-gray-800 dark:text-gray-200 hover:text-beige-anchor hover:underline transition cursor-pointer"
                onClick={handleScrollToProjects}
              >
                Projects
              </a>
              <Link
                href="/about"
                className="text-md font-medium text-gray-800 dark:text-gray-200 hover:text-beige-anchor hover:underline transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-md font-medium text-gray-800 dark:text-gray-200 hover:text-beige-anchor hover:underline transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}

      {/* <section className="min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white gap-10">
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
          className="mt-24 px-8 py-4 rounded-full border-2 border-golden-anchor text-golden-anchor text-md font-bold hover:bg-beige-tint1 transition cursor-pointer"
        >
          See My Work
        </button>
      </section>

      {/* Projects Section with gradient background */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div
          ref={projectsRef}
          className="relative w-full flex flex-col items-center"
        >
          {/* Gradient Circles as background for projects only */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-[#f7f4de] to-[#d4c566] rounded-full opacity-40 blur-3xl top-[60px] left-[-200px]" />
            <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-[#D3D8EB] to-[#7B86A8] rounded-full opacity-70 blur-3xl top-[120px] left-[25%]" />
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-[#b0c4b1] to-[#4a5759] rounded-full opacity-30 blur-2xl top-[500px] left-[70%]" />
          </div>
          <section
            id="target-projects"
            className="flex flex-col gap-8 max-w-6xl w-full py-20"
          >
            <h2 className="text-lg font-md mb-1 text-gray-700 dark:text-gray-100 text-left">
              Projects
            </h2>
            <Link
              href={`/projects/project-access?target=brand-approval`}
              className="block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-col md:flex-row items-center w-full">
                <Image
                  src="/cover-BrandApproval.png"
                  alt="Project 1"
                  width={600}
                  height={400}
                  className="rounded mb-4 md:mb-0 md:mr-16"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Brand Approval Flow to Automate Ad Delivery on Podcasts
                  </h2>
                  <p className="text-gray-900 dark:text-gray-300 text-center md:text-left">
                    Created a 2-step, policy-driven system that balances network
                    control and show-level autonomy. Cut approval time from 25+
                    hours to under 2 hours per month, enabled real-time brand
                    activation, and eliminated manual errors.
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href={`/projects/project-access?target=episode`}
              className="block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-col md:flex-row items-center w-full">
                <Image
                  src="/cover-episode.png"
                  alt="Project 2"
                  width={600}
                  height={400}
                  className="rounded mb-4 md:mb-0 md:mr-16"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Episode Publishing Experience Redesign
                  </h2>
                  <p className="text-gray-900 dark:text-gray-300 text-center md:text-left">
                    Redesigned the episode publishing experience to support
                    self-serve onboarding. By consolidating content editing and
                    scheduling into a single page with simplified actions, we
                    significantly cut publishing time and introduced a reusable
                    design pattern for future scalability.{" "}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} DX. All rights reserved.
        </footer>
      </main>
    </>
  );
}
