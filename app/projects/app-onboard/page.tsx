"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  StarIcon,
  ArrowDownRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { BottomNav } from "../shared-components/bottom-nav";
import Footer from "../shared-components/footer";

export default function AppOnboardProject() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      {" "}
      {/* Header image on top */}
      <div className="w-full flex justify-center mb-2 bg-[#FAF1F2]">
        <Image
          src="/cover-aob-1.png"
          alt="Application Onboarding Project"
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
            className="inline-flex items-center text-sm border border-blue-shade rounded-full pl-2 pr-3 py-1 text-blue-dark font-bold hover:bg-blue-anchor hover:text-white transition"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 mr-2 rounded-full bg-blue-pink2">
              {/* Arrow icon */}
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

        {/* Title, description, side column for role and tags */}
        <section className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col mt-4">
            <h1 className="text-4xl font-bold mb-4">
              Onboard Applications with Zero Coding Required
            </h1>
            <p className="text-md text-gray-900 mb-4">
              Focused on the initial phase of app management—onboarding and
              setup—by streamlining complex workflows for multiple user types
              and introducing visual UI alternatives to technical inputs such as
              code and policy configurations.
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
                Admin Function
              </span>
              <span className="border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                IGA & IAM
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
              <span className="ml-2 text-gray-900 text-sm">Desktop App</span>
            </div>
          </aside>
        </section>

        {/* Outcomes Section*/}
        <section className="max-w-5xl w-full mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Project Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="grid md:col-span-1 flex flex-row items-left bg-blue-pink2 rounded-lg p-6">
              <div className="flex flex-row gap-3 items-start">
                <StarIcon className="w-6 h-6 text-purple-dark mt-1 flex-none" />
                <p className="flex-1 text-purple-dark text-left font-medium">
                  <span className="font-extrabold text-lg">
                    Made Application Onboarding a Breeze for Admins: <br />
                  </span>
                  removed the need for coding, replacing it with intuitive
                  graphic UI and easy-to-use configurations.
                </p>
              </div>
            </div>
            <div className="grid md:col-span-1 items-left bg-blue-pink2 rounded-lg p-6">
              <div className="flex flex-row gap-3 items-start">
                <StarIcon className="w-6 h-6 text-purple-dark mt-1 flex-none" />
                <p className="flex-1 text-purple-dark text-left font-medium">
                  <span className="font-extrabold text-lg">
                    Reduced Support Effort by 40%, Created a Scalable Process:{" "}
                    <br />
                  </span>
                  contributed to long-term strategic goal that one Identity
                  Cloud for all enterprise applications.{" "}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Design Process
          </h2>

          <div className="flex gap-4 max-w-5xl mx-auto">
            <Image
              src="/AOB-process.png"
              alt="Design Process"
              width={1200}
              height={400}
              className="mx-auto rounded-lg object-cover"
            />
          </div>
        </section>

        {/* How to Onboard an App? */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            How to Onboard an App?
          </h2>
          <p className="text-md text-gray-900 mb-2 text-left">
            The onboarding process begins with the primary flow design, where
            two personas collaborate:
          </p>
          <ul className="list-disc pl-6 mb-2">
            <li>
              <span className="font-extrabold">Admins</span> handle the basic
              setup, including app name, description, and data import.
            </li>
          </ul>
          <ul className="list-disc pl-6 mb-2">
            <li>
              <span className="font-extrabold">App Owners</span> focus on
              configuring technical settings.
            </li>
          </ul>
          <p className="text-md text-gray-900 mb-8 text-left">
            Given the varying levels of familiarity among App Owners, some
            require guidance while others don’t. This led to the design of an
            assistance mode to accommodate both needs.
          </p>
          <div className="flex gap-4 max-w-5xl mx-auto">
            <Image
              src="/AOB-wires.png"
              alt="Onboarding Flow Wireframes"
              width={1000}
              height={400}
              className="mx-auto rounded-lg object-cover"
            />
          </div>
        </section>

        {/* Primary Flow */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            The Primary Flow: Assisted vs. Customized Modes
          </h2>
          <p className="text-md text-gray-900 mb-2 text-left">
            During wireframing and prototyping, I defined the core content for
            the primary onboarding flow, categorizing details into{" "}
            <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1">
              required vs. optional
            </span>{" "}
            and{" "}
            <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1">
              business vs. technical
            </span>{" "}
            inputs. For Assisted and Customized modes, I organized settings by
            functionality to create a more intuitive and user-friendly
            experience.
          </p>
          <div className="flex gap-4 max-w-5xl mx-auto">
            <Image
              src="/AOB-prototype.png"
              alt="Onboarding Primary flow Design"
              width={1200}
              height={400}
              className="auto mx-auto rounded-lg object-cover"
            />
          </div>
        </section>

        {/* How to Flow Users on a Wizard? */}
        <section className="max-w-5xl w-full mb-32">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            How to Flow Users on a Wizard?
          </h2>
          <div className="md:grid grid-cols-[1fr_1px_1fr] gap-8 bg-transparent items-stretch mb-8">
            <div className="pl-6 py-1 flex flex-col justify-center">
              <span className="text-xl italic font-extrabold text-purple-dark mb-2 text-left">
                Minimal Steps
              </span>
              <span className="text-gray-900 font-medium text-left">
                Limit the number of questions and eliminate unnecessary steps.
              </span>
            </div>
            {/* Vertical divider for md and up */}
            <div className="h-full w-0.5 bg-blue-pink1 mx-auto rounded" />
            <div className="pl-6 py-1 flex flex-col justify-center">
              <span className="text-xl italic font-extrabold text-purple-dark mb-2 text-left">
                Group Settings
              </span>
              <span className="text-gray-900 font-medium text-left">
                Organize onboarding questions into logical, meaningful steps.
              </span>
            </div>
          </div>
          <div className="md:grid grid-cols-[1fr_1px_1fr] gap-8 bg-transparent items-stretch">
            <div className="pl-6 py-1 flex flex-col justify-center">
              <span className="text-xl italic font-extrabold text-purple-dark mb-2 text-left">
                Intuitive & Easy
              </span>
              <span className="text-gray-900 font-medium text-left">
                Ensure the wizard is easy to navigate, so users feel confident
                throughout the process.
              </span>
            </div>
            {/* Vertical divider for md and up */}
            <div className="h-full w-0.5 bg-blue-pink1 mx-auto rounded" />
            <div className="pl-6 py-1 flex flex-col justify-center">
              <span className="text-xl italic font-extrabold text-purple-dark mb-2 text-left">
                Able to Change
              </span>
              <span className="text-gray-900 font-medium text-left">
                Allow users to go back and modify choices, with the ability to
                adjust initial settings.How to Flow Users on a Wizard?
              </span>
            </div>
          </div>
        </section>

        {/* Onboarding Wizard */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left flex items-center gap-2">
            Onboarding Wizard: Iterate the Step of Data Import{" "}
            <span className="inline-flex italic items-center gap-1 px-3 py-1 rounded-full bg-beige-tint1 border border-yellow-300 text-yellow-800 text-sm font-semibold animate-pulse shadow-sm">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              Spotlight
            </span>
          </h2>
          <p className="text-md text-gray-900 mb-8 text-left">
            A key challenge in the wizard flow was the step of Data Import,
            where I had to balance regulatory requirements with users'
            established habits for storing data. The challenge was to decide
            between technical limitations and to ensure the process remained
            business-friendly and easy-to-use.
          </p>
          <Image
            src="/AOB-dataimport.png"
            alt="Data Import Design"
            width={1200}
            height={400}
            className="h-auto mx-auto object-cover mb-8"
          />
        </section>

        {/* Bring Simplicity to App Settings */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Simplify Technical Settings by GUI{" "}
          </h2>
          <p className="text-md text-gray-900 mb-8 text-left">
            Many previous settings that only allowed code input were reworked
            with a graphic UI and simplified configurations for tools like the
            JSON Editor, Condition Writer, and Rule Designer. However, both
            visual and coding options were provided, as technical users may
            still prefer the coding method.
          </p>
          <Image
            src="/AOB-gui.png"
            alt="Graphical UI Design for Coding Inputs"
            width={1200}
            height={400}
            className="h-auto mx-auto object-cover mb-8"
          />
        </section>

        {/* Video */}
        <section className="max-w-5xl w-full mx-auto mb-30">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Onboarding Flow Demo
          </h2>
          {/* LinkedIn post preview */}
          <div className="w-full flex justify-center mb-6">
            <a
              href="https://www.linkedin.com/posts/saviynt_saviynt-iga-smarter-simpler-identity-activity-6920781681616453632-O9JY?utm_source=share&utm_medium=member_desktop&rcm=ACoAABxfzcUBQmjW60a6NncpV_C2f6ex9_bs_H0"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#f3f6fa] border border-gray-200 rounded-lg shadow-md px-8 py-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="8" fill="#0A66C2" />
                  <path
                    d="M12.5 16.5h3v11h-3v-11zm1.5-1.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm4.5 1.5h2.9v1.5h.04c.4-.76 1.36-1.56 2.8-1.56 3 0 3.56 1.98 3.56 4.56v6.5h-3v-5.75c0-1.37-.03-3.13-1.91-3.13-1.91 0-2.2 1.49-2.2 3.03v5.85h-3v-11z"
                    fill="#fff"
                  />
                </svg>
                <span className="font-bold text-[#0A66C2] text-lg">
                  Saviynt IGA: Smarter, Simpler Identity Management – see the
                  onboarding flow walkthrough in action.
                </span>
              </div>
              <div className="text-gray-800 text-base mb-2">
                Wonder what you could accomplish with smarter, simpler identity?
                One powerful platform, with intuitive controls and seamless
                integrations.
              </div>
              <div className="text-gray-500 text-sm">
                linkedin.com &middot; External Link
              </div>
            </a>
          </div>
        </section>

        {/* Footer */}
        <BottomNav
          previousProject="/projects/risk-detection"
          previousProjectName="Risk Detection"
          nextProject="/projects/project-access?target=brand-approval"
          nextProjectName="Brand Approval"
          textColor="text-blue-dark"
          hoverColor="hover:text-blue-anchor"
        />
        <Footer customValue="max-w-5xl" />
      </main>
    </>
  );
}
