"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckBadgeIcon,
  ArrowDownRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { BottomNav } from "../shared-components/bottom-nav";
import Footer from "../shared-components/footer";

export default function RiskDetectionProject() {
  useEffect(() => {
    window.scroll(0, 0);
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
            <h1 className="text-4xl font-bold mb-4">
              Application Onboarding Experience
            </h1>
            <p className="text-md text-gray-900 mb-4">
              Focused on the initial phase of app management — onboarding and
              setup. Streamlined the experience for multiple user types by
              simplifying complex workflows and introducing a visual UI as an
              alternative to technical inputs like code and policy
              configurations.
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
                Access Management, IGA/IAM
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
            <div className="grid md:col-span-1 flex flex-row items-left bg-purple-tint1 rounded-lg p-6">
              <div className="flex flex-row gap-3 items-start">
                <CheckBadgeIcon className="w-6 h-6 text-purple-dark mt-1 flex-none" />
                <p className="flex-1 text-purple-dark text-left font-medium">
                  <span className="font-extrabold">
                    Make Application Onboarding a Breeze for Admins. <br />
                  </span>
                  Removed the need for coding experience, replacing it with an
                  intuitive graphic UI and easy-to-use configurations, making
                  onboarding seamless for admins.
                </p>
              </div>
            </div>
            <div className="grid md:col-span-1 items-left bg-purple-tint1 rounded-lg p-6">
              <div className="flex flex-row gap-3 items-start">
                <CheckBadgeIcon className="w-6 h-6 text-purple-dark mt-1 flex-none" />
                <p className="flex-1 text-purple-dark text-left font-medium">
                  <span className="font-extrabold">
                    Reduced Support Effort, Created a Scalable Process. <br />
                  </span>
                  Contributed to long-term strategic goal that one Enterprise
                  Identity Cloud for all enterprise applications. The simplified
                  process opened the door to this scalable future.{" "}
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
          <p className="text-md text-gray-900  mb-8 text-left">
            The onboarding process begins with the primary flow design, where two personas collaborate:{" "}
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
                  👩‍⚖️ Risk Specialists (30%)
                </span>
                <p>
                  This group is responsible for setting up risk rules, reviewing
                  risks, and ensuring security compliance within the company..
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ideation */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Ideation
          </h2>
          <p className="text-md text-gray-900 mb-8 text-left">
            Created two workflow designs and hand-sketched corresponding pages,
            then discussed them with the team:{" "}
          </p>
          <span className="font-extrabold">People Managers</span> and{" "}
          <span className="font-extrabold">Risk Specialists</span>:
          <ul className="list-disc pl-6 mb-8">
            <li>
              <span className="font-extrabold">Flow A</span> – – Designed for
              People Managers, focusing on straightforward request reviews based
              on employee roles.
            </li>
            <li>
              <span className="font-extrabold">Flow B</span> – – Tailored for
              Risk Owners, incorporating detailed risk analysis and resolution
              steps.
            </li>
          </ul>
          <Image
            src="/Risk-ideation.png"
            alt="Flowmap"
            width={700}
            height={400}
            className="h-auto mx-auto object-cover mb-8"
          />
        </section>

        {/* Final Design */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Final Design
          </h2>
          <p className="text-md text-gray-900 mb-8 text-left">
            Addressed the challenges by designing distinct experiences for both{" "}
          </p>
          <span className="font-extrabold">People Managers</span> and{" "}
          <span className="font-extrabold">Risk Specialists</span>:
          <ul className="list-disc pl-6 mb-8">
            <li>
              <span className="font-extrabold">Waterfall Experience</span> –
              Streamlined for People Managers, allowing them to review requests
              without needing to dive into risk details.
            </li>
            <li>
              <span className="font-extrabold">Full Risk Page</span> – Dedicated
              for Risk Specialists, providing in-depth risk information for
              thorough analysis and decision-making.
            </li>
          </ul>
          <Image
            src="/Risk-final.png"
            alt="Final product design"
            width={1000}
            height={400}
            className="h-auto mx-auto object-cover mb-8"
          />
        </section>

        {/* Footer */}
        <BottomNav
          previousProject="/projects/project-access?target=episode"
          previousProjectName="Episode Publishing"
          nextProject="/projects/project-access?target=brand-approval"
          nextProjectName="Brand Approval"
          textColor="text-purple-anchor"
          hoverColor="hover:text-purple-dark"
        />
        <Footer customValue="max-w-5xl" />
      </main>
    </>
  );
}
