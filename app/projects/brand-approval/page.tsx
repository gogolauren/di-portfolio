"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function BrandApprovalProject() {
  const router = useRouter();

  useEffect(() => {
    const hasAccess = sessionStorage.getItem("hasAccess");
    if (!hasAccess) {
      router.replace("/projects/project-access");
    }
  }, [router]);
  // Add this inside your component, where you want the tab section:
  const [activeTab, setActiveTab] = useState<MyKey>("A");
  const tabContent = {
    A: {
      title: "Network Policies",
      text: "Manage brand policies which define the default approval or rejection decision for the selected brands / brand categories.",
      img: {
        src: "/BA-wirenetwork.png",
        alt: "Network Approval Image",
        width: 800,
        height: 400,
      },
    },
    B: {
      title: "Series Approval",
      text: "Review cascaded brands for approval or rejection, with the ability to override network-level decisions. ",
      img: {
        src: "/BA-wireseries1.png",
        alt: "Series Approval Image",
        width: 800,
        height: 400,
      },
    },
    C: {
      title: "Approve with Conditions",
      text: "Brands need to be reviewed from multiple perspectives, such as the requesting Ad agency, how the Ad is presented, and whether the host would endorse the brand. Some users may approve brands with specific conditions. This design enables a scalable approval flow, allowing for more complex advertising requirements to be efficiently managed.",
      img: {
        src: "/BA-wireseries2.png",
        alt: "Approve with Conditions Image",
        width: 800,
        height: 400,
      },
    },
  };

  type MyKey = keyof typeof tabContent;
  const tabKeys: MyKey[] = Object.keys(tabContent) as MyKey[];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    //   intervalRef.current = setInterval(() => {
    //     setActiveTab((prev) => {
    //       const currentIndex = tabKeys.indexOf(prev);
    //       const nextIndex = (currentIndex + 1) % tabKeys.length;
    //       return tabKeys[nextIndex];
    //     });
    //   }, 4000);
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleTabClick = (tab: MyKey) => {
    setActiveTab(tab);
    resetInterval();
  };

  return (
    <>
      {/* Header image on top */}
      <div className="w-full flex justify-center mb-2">
        <Image
          src="/cover-BrandApproval.png"
          alt="Brand Approval Project"
          width={1920}
          height={400}
          className="w-screen max-w-none h-[300px] md:h-[500px] object-contain"
          style={{ backgroundColor: "#F0EACA" }}
          priority
        />
      </div>
      <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-white dark:bg-black">
        {/* Back button below header */}
        <div className="max-w-5xl w-full flex justify-start mb-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm border border-beige-tint1 rounded-full pl-2 pr-3 py-1 text-golden-dark font-bold hover:bg-beige-anchor hover:text-white transition"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 mr-2 rounded-full bg-beige-tint1">
              {/* Arrow icon */}
              <svg
                className="w-3 h-3 text-golden-dark"
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
            Back
          </Link>
        </div>

        {/* Title, description, side column for role and tags */}
        <section className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col mt-4">
            <h1 className="text-4xl font-bold mb-4">
              Brand Approval Flow to Automate Ad Delivery on Podcasts
            </h1>
            <p className="text-md text-gray-900 dark:text-gray-300 mb-4">
              Created a 2-step, policy-driven system that balances network
              control and show-level autonomy. Cut approval time from 25+ hours
              to under 2 hours per month, enabled real-time brand activation,
              and eliminated manual errors.
            </p>
          </div>
          {/* Side column */}
          <aside className="flex flex-col gap-4 border border-gray-200 dark:border-gray-700 bg-gray-0 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Tags:
              </span>
              <span className="border border-gray-200 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                Amazon
              </span>
              <span className="border border-gray-200 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                Advertising
              </span>
              <span className="border border-gray-200 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                Monetization
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                My Role:
              </span>
              <span className="ml-2 text-gray-900 dark:text-gray-300 text-sm">
                Led the end-to-end UX process, including user research, workflow
                analysis, interaction design, and delivery strategy.
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Platform:
              </span>
              <span className="ml-2 text-gray-900 dark:text-gray-300 text-sm">
                Desktop App
              </span>
            </div>
          </aside>
        </section>
        {/* Outcomes Section*/}
        <section className="max-w-5xl w-full mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            Project Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="flex flex-col items-left bg-beige-tint1 rounded-lg p-6">
              <span className="w-3 h-3 bg-golden-dark rounded-full mb-4"></span>
              <p className="text-golden-dark text-left font-medium">
                Developed a streamlined Brand Approval process that accelerates
                campaign delivery while maintaining brand safety.
              </p>
            </div>
            <div className="flex flex-col items-left bg-golden-dark rounded-lg p-6">
              <span className="w-3 h-3 bg-gray-50 rounded-full mb-2"></span>
              <p className="text-gray-50 text-left font-medium">
                Reduced approval time from{" "}
                <span className="text-2xl font-extrabold">25+ </span> hours to{" "}
                <span className="text-2xl font-extrabold"> less than 2 </span>{" "}
                hours per month, and minimized human errors, significantly
                increasing efficiency.
              </p>
            </div>
            <div className="flex flex-col items-left bg-beige-base  rounded-lg p-6">
              <span className="w-3 h-3 rounded-full mb-4"></span>
              <p className="text-golden-dark text-left font-medium">
                <span className="text-2xl font-extrabold">1st app</span> in the
                industry to enable publishers to control their shows' branding.
              </p>
            </div>
          </div>
        </section>
        {/* Outcomes Section 绿色底色*
      <section className="max-w-5xl w-full mb-20">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">Project Outcomes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="flex flex-col items-left bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
          <span className="w-3 h-3 bg-emerald-800 dark:bg-emerald-50 rounded-full mb-4"></span>
          <p className="text-emerald-800 dark:text-emerald-100 text-left font-medium">
            Developed a streamlined Brand Approval process that accelerates campaign delivery while maintaining brand safety.
          </p>
        </div>
        <div className="flex flex-col items-left bg-emerald-800 dark:bg-gray-50 rounded-lg p-6">
          <span className="w-3 h-3 bg-gray-50 rounded-full mb-2"></span>
          <p className="text-gray-50 text-left font-medium">
            Reduced approval time from <span className="text-2xl font-extrabold">25+ </span> hours to <span className="text-2xl font-extrabold"> less than 2 </span> hours per month, and minimized human errors, significantly increasing efficiency.
          </p>
        </div>
        <div className="flex flex-col items-left bg-lime-100 dark:bg-lime-100 rounded-lg p-6">
          <span className="w-3 h-3 bg-emerald-800 rounded-full mb-4"></span>
          <p className="text-emerald-800 text-left font-medium">
            <span className="text-2xl font-extrabold">1st app</span> {" "} in the industry to enable publishers to control their shows' branding.
          </p>
        </div>
      </div>
      </section> /}
    {/* Existing Problems */}
        <section className="max-w-5xl w-full mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            Existing Problems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="flex flex-col gap-4 border-l-8 border-beige-tint1 dark:border-gray-700 bg-gray-0 dark:bg-gray-800 rounded py-2 px-6">
              <p className="font text-gray-900 dark:text-gray-100">
                {" "}
                <span className="font-extrabold text-3xl italic text-beige-anchor">
                  1.{" "}
                </span>
                Podcasts often discover unwanted brands in their episodes too
                late, risking conflicts with their intended brand image.
              </p>
            </div>
            <div className="flex flex-col gap-4 border-l-8 border-beige-tint1 dark:border-gray-700 bg-gray-0 dark:bg-gray-800 rounded py-2 px-6">
              <p className="font text-gray-900 dark:text-gray-100">
                {" "}
                <span className="font-extrabold text-3xl italic text-beige-anchor">
                  2.{" "}
                </span>
                Campaigns fail to achieve full delivery when podcasts
                excessively reject Ads by blocking brand categories, hurting
                revenue.
              </p>
            </div>
          </div>
        </section>
        {/* User Interviews & Findings
    <section className="max-w-5xl w-full mb-32">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">User Interviews & Findings</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
        <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
          <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-200 mb-2">📒 1000+ brands</span>
          <p className="text-gray-900 dark:text-gray-100 font-medium">to review initially</p>
        </div>
        <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
          <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-200 mb-2">⏱️ 2 weeks ~ 2 months</span>
          <p className="text-gray-900 dark:text-gray-100 font-medium">to complete review</p>
        </div>
        <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
          <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-200 mb-2">⏰ 25 hours/month</span>
          <p className="text-gray-900 dark:text-gray-100 font-medium">were required</p>
        </div>
        <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-700 bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
          <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-200 mb-2">⚠️ Errors & delays</span>
          <p className="text-gray-900 dark:text-gray-100 font-medium">caused by people jeopardize revenue</p>
        </div>
      </div>
    </section> */}

        {/* User Interviews & Findings */}
        <section className="max-w-5xl w-full mb-32">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            User Interviews & Findings
          </h2>
          <div className="flex flex-row justify-center bg-transparent">
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <span className="text-2xl font-extrabold text-golden-dark dark:text-emerald-200 mb-2 text-center">
                1000+
              </span>
              <span className="text-lg text-gray-900 dark:text-gray-100 font-medium text-center">
                brands to review initially
              </span>
            </div>
            <div className="w-0.5 bg-beige-shade dark:bg-gray-700 mx-2" />
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <span className="text-2xl font-extrabold text-golden-dark dark:text-emerald-200 mb-2 text-center">
                1/2 - 2 months
              </span>
              <span className="text-lg text-gray-900 dark:text-gray-100 font-medium text-center">
                to complete review
              </span>
            </div>
            <div className="w-0.5 bg-beige-shade dark:bg-gray-700 mx-2" />
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <span className="text-2xl font-extrabold text-golden-dark dark:text-emerald-200 mb-2 text-center">
                25h/month
              </span>
              <span className="text-lg text-gray-900 dark:text-gray-100 font-medium text-center">
                were required
              </span>
            </div>
            <div className="w-0.5 bg-beige-shade dark:bg-gray-700 mx-2" />
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <span className="text-2xl font-extrabold text-golden-dark dark:text-emerald-200 mb-2 text-center">
                Errors & delays
              </span>
              <span className="text-lg text-gray-900 dark:text-gray-100 font-medium text-center">
                jeopardize revenue
              </span>
            </div>
          </div>
        </section>
        {/* Another Key Challenge */}
        <section className="max-w-5xl w-full mb-20 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex-none md:flex-initial pr-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
              Another Key Challenge
            </h2>
            <p className="text text-gray-900 dark:text-gray-100 mb-4">
              Nuanced brand evaluation approaches is the key challenge —{" "}
              <span className="font-extrabold">
                Series Autonomy v.s. Network Control
              </span>
              . Based on the user interview notes (captured in grey sticky
              notes), I synthesized user needs using a bottom-up approach.
            </p>
          </div>
          <div className="flex flex-1 justify-center">
            <Image
              src="/BA-useranalytics.png"
              alt="user research and analytics"
              width={1200}
              height={900}
              className="rounded-lg border border-gray-100 dark:border-gray-700 object-cover"
            />
          </div>
        </section>
        {/* Roles and Responsibilities */}
        <section className="max-w-5xl w-full mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left w-full">
            Roles and Responsibilities
          </h2>
          <div className="flex flex-col gap-8 dark:border-gray-700 bg-beige-tint2 dark:bg-gray-800 rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 border border-beige-base dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="text-semibold text-gray-50 mb-4">
                  <span className="bg-golden-dark px-2 py-1">Advertising:</span>
                </div>
                <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100">
                  <li>
                    {" "}
                    <span className="font-extrabold">Ad Sellers</span> send new
                    brands to publishers for review.
                  </li>
                  <li>
                    {" "}
                    <span className="font-extrabold">
                      Campaign Managers
                    </span>{" "}
                    create campaigns for approved brands, and ensure campaigns
                    achieve their target impression numbers.
                  </li>
                </ul>
              </div>
              <div className="flex-1 gap-4 border border-beige-base dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="text-semibold text-gray-50 mb-4">
                  <span className="bg-golden-dark px-2 py-1">Publishing:</span>
                </div>
                <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100">
                  <li>
                    {" "}
                    <span className="font-extrabold">
                      Series/Publishers
                    </span>{" "}
                    review the requested brands and make approval or rejection
                    decisions.
                  </li>
                  <li>
                    {" "}
                    <span className="font-extrabold">
                      Network Managers
                    </span>{" "}
                    also review brands on behalf of individual podcasts.
                  </li>
                </ul>
              </div>
            </div>
            {/*<div className="flex-1 flex justify-center border-beige-base dark:border-gray-700 bg-beige-tint2 dark:bg-gray-800 rounded-lg p-6">
                <Image
                src="/BA-roles.png"
                alt="roles and responsibilities"
                width={800}
                height={600}
                className="rounded-lg border border-gray-100 dark:border-gray-700 object-cover"
                />
            </div> */}
          </div>
        </section>

        {/* Product Goal */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-12 text-gray-900 dark:text-gray-100 text-left">
            Product Goal
          </h2>
          <div className="relative flex flex-col items-center justify-center">
            {/* SVG circles as background */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <Image
                src="/vector-bg.svg"
                alt="Background circles"
                width={300}
                height={400}
                className="mx-auto h-auto object-contain opacity-60 blur-sm"
                priority
              />
            </div>
            {/* Quote and icon on top */}
            <div className="flex items-center gap-3 mb-8 max-w-xl mx-auto z-10">
              <svg
                className="w-16 h-16 text-beige-anchor flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 17h2v-6H5v8h4v-2H7v-2zm10-6h-4v8h4v-2h-2v-2h2v-4z" />
              </svg>
              <blockquote className="text-2xl italic font text-golden-dark leading-normal text-center">
                The quicker a brand receives approval, the sooner the campaign
                run ads and generate revenue.
              </blockquote>
              <svg
                className="w-16 h-16 text-beige-anchor flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 17h2v-6H5v8h4v-2H7v-2zm10-6h-4v8h4v-2h-2v-2h2v-4z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Exploration and Validation */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-12 text-gray-900 dark:text-gray-100 text-left">
            Exploration and Validation
          </h2>
          <div className="flex flex-col gap-16">
            {/* Sub-section 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-left">
                Deep Dive into Data Structure & Logic:
              </h3>
              <p className="text-md text-gray-900 dark:text-gray-300 mb-6 text-left">
                To design the end-to-end flow of Brand Approval, I needed to
                deeply understand our system and data hierarchy. A holistic
                design begins with permission design — determining who makes
                requests and who receives them.
                <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100">
                  <li>
                    {" "}
                    <span className="font-extrabold">Requesting:</span> Ad
                    Operation Managers (or Ad Sellers) select brands and send
                    request to series.
                  </li>
                </ul>
              </p>
              <div className="flex gap-4 w-full">
                <Image
                  src="/BA-datahierarchy.png"
                  alt="Data hierarchy"
                  width={600}
                  height={400}
                  className="w-1/2 h-auto rounded-lg border border-gray-100 dark:border-gray-700 object-cover"
                />
                <Image
                  src="/BA-data.png"
                  alt="Data flow"
                  width={600}
                  height={400}
                  className="w-1/2 h-auto rounded-lg border border-gray-100 dark:border-gray-700 object-cover"
                />
              </div>
            </div>
            {/* Sub-section 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-left">
                Introduce 2-Step Review to Accommodate Separate Users:
              </h3>
              <p className="text-md text-gray-900 dark:text-gray-300 mb-6 text-left">
                <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100">
                  <li>
                    {" "}
                    <span className="font-extrabold">
                      Network Review:{" "}
                    </span>{" "}
                    Brands are initially reviewed at the network level,
                    representing a collection of series. Network managers can
                    apply{" "}
                    <span className="italic font-bold text-golden-dark underline decoration-wavy underline-offset-4 decoration-beige-anchor dark:decoration-gray-700">
                      Network Policies — advanced filtering rules that
                      categorize brands by sensitivities.
                    </span>{" "}
                    These policies minimize manual reviews while providing
                    flexibility for asynchronous updates, ensuring networks can
                    adjust standards without delays.
                  </li>
                  <li>
                    {" "}
                    <span className="font-extrabold">Series Review: </span>After
                    passing the network review, brands cascade to individual
                    podcasts for final evaluation. This step respects the
                    creative autonomy of each show, allowing them to override
                    network approvals when necessary.
                  </li>
                </ul>
              </p>
              <div className="flex gap-4 w-full">
                <Image
                  src="/BA-sketch.jpeg"
                  alt="Brand Approval Sketches"
                  width={600}
                  height={300}
                  className="mx-auto rounded-lg object-cover"
                />
              </div>
              <p className="text-md text-gray-900 dark:text-gray-300 mb-6 text-left">
                By designing a{" "}
                <span className="italic font-bold text-golden-dark underline decoration-wavy underline-offset-4 decoration-beige-anchor dark:decoration-gray-700">
                  configurable, two-step process,
                </span>{" "}
                I accounted for the varying levels of scrutiny different
                publishers apply. Networks seeking consistency can rely on
                policy-driven automation, while more independent series can
                maintain control.
              </p>
              <div className="flex gap-4 w-full">
                <Image
                  src="/BA-flow.png"
                  alt="Brand Approval Flowcharts"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg border border-gray-0 dark:border-gray-700 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section Wireframes */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            Wireframes
          </h2>
          <div className="relative mb-8">
            <div className="flex justify-center gap-10">
              {tabKeys.map((tab) => (
                <button
                  key={tab}
                  className={`bg-transparent px-0 py-2 font text transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "font-bold text-golden-dark underline underline-offset-11 decoration-3"
                      : "text-gray-900 dark:text-gray-300 hover:text-beige-anchor hover:underline underline-offset-11 decoration-3"
                  } transition`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tabContent[tab as MyKey].title}
                </button>
              ))}
            </div>
            {/* Gray line positioned at the bottom, overlapping tab underlines */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-100 w-full" />
          </div>

          {/* Content for the active tab */}
          <div className="flex flex-col md:flex-row w-full bg-beige-tint2 gap-8 rounded-lg px-8 py-6">
            <div className="w-full md:w-1/4 max-w-2xl flex-initial mb-8 mt-8">
              <h3 className="text-lg font-bold mb-4 text-golden-dark dark:text-gray-100 text-left w-full mt-6">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left w-full">
                {tabContent[activeTab].text}
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <Image
                src={tabContent[activeTab].img.src}
                alt={tabContent[activeTab].img.alt}
                width={tabContent[activeTab].img.width}
                height={tabContent[activeTab].img.height}
                className="w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* High Fidelity in Design System Adoption */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            High Fidelity in Design System Adoption
          </h2>
          <p className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left">
            <span className="font-extrabold">Requesting:</span> Initiates the
            brand approval workflow. Ad sellers include specific requirements in
            their brand requests.
          </p>
          <div className="flex w-full justify-center mb-12">
            <Image
              src="/BA-final-request.png"
              alt="Brand Approval Final Design"
              width={800}
              height={400}
              className="mx-autoobject-cover"
            />
          </div>
          <p className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left">
            <span className="font-extrabold">Network Review:</span> Brands are
            either auto-approved or rejected based on policy, or manually
            reviewed by the network.
          </p>
          <div className="flex w-full justify-center mb-12">
            <Image
              src="/BA-final-networkpolicy.png"
              alt="Brand Approval Final Design"
              width={800}
              height={400}
              className="mx-auto object-cover"
            />
          </div>
          <p className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left">
            <span className="font-extrabold">Series Review:</span> Introduced a
            mechanism to remember approval decisions for the same brand across
            different sellers, reducing repeated reviews.
          </p>
          <div className="flex flex-col w-full justify-center mb-12">
            <Image
              src="/BA-final-series.png"
              alt="Brand Approval Final Design"
              width={800}
              height={400}
              className="mx-auto object-cover mb-4"
            />
            <Image
              src="/BA-final-series2.png"
              alt="Data flow"
              width={800}
              height={400}
              className="mx-auto object-cover"
            />
          </div>
        </section>
      </main>
    </>
  );
}
