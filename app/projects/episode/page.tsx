"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FireIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function EpisodeProject() {
  const router = useRouter();

  useEffect(() => {
    const hasAccess = sessionStorage.getItem("hasAccess");
    if (!hasAccess) {
      router.replace("/projects/project-access");
    }
  }, [router]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      {" "}
      {/* Header image on top */}
      <div className="w-full flex justify-center mb-2 bg-gradient-to-br from-[#EACAF0] to-[#ADB7D9]">
        <Image
          src="/cover-episodeonly.svg"
          alt="Brand Approval Project"
          width={1920}
          height={400}
          className="w-screen max-w-none h-[300px] md:h-[500px] object-contain"
          priority
        />
      </div>
      <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-white dark:bg-black">
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
            Back
          </Link>
        </div>

        {/* Title, description, side column for role and tags */}
        <section className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col mt-4">
            <h1 className="text-4xl font-bold mb-4">
              Episode Publishing Experience Redesign
            </h1>
            <p className="text-md text-gray-900 dark:text-gray-300 mb-4">
              Redesigned the episode publishing experience to support self-serve
              onboarding. By consolidating content editing and scheduling into a
              single page with simplified actions, we significantly cut
              publishing time and introduced a reusable design pattern for
              future scalability.
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
                Creator Experience
              </span>
              <span className="border border-gray-200 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                Podcast
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                My Role:
              </span>
              <span className="ml-2 text-gray-900 dark:text-gray-300 text-sm">
                Led the end-to-end UX process: user research, workflow
                iterations, interaction design, and design system improvements.
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
            <div className="grid md:col-span-2 flex flex-row items-left bg-blue-pink2 rounded-lg p-6">
              <div className="flex flex-row gap-3 items-start">
                <FireIcon className="w-6 h-6 text-blue-dark mt-1 flex-none" />
                <p className="flex-1 text-blue-dark text-left font-medium">
                  The redesign supports our{" "}
                  <span className="font-extrabold">Self-Serve initiative</span>,
                  enabling new clients to onboard and publish independently.
                </p>
              </div>
            </div>
            <div className="grid md:col-span-2 items-left bg-blue-dark rounded-lg p-6">
              <div className="flex flex-row gap-3 items-start">
                <FireIcon className="w-6 h-6 text-white mt-1 flex-none" />
                <p className="flex-1 text-white text-left font-medium">
                  <span className="font-extrabold">
                    A simplified, single-page flow
                  </span>
                  , and streamlined logic reduced episode publishing time.
                </p>
              </div>
            </div>
            <div className="grid md:col-span-2 md:col-start-2 items-left bg-blue-shade rounded-lg p-6">
              <div className="flex flex-row gap-3 items-start">
                <FireIcon className="w-6 h-6 text-blue-dark mt-1 flex-none" />
                <p className="flex-1 text-blue-dark text-left font-medium">
                  This one-page flow now serves as a{" "}
                  <span className="font-extrabold">scalable UX pattern</span>,
                  across the product.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Existing Problems */}
        <section className="max-w-5xl w-full mb-20 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex-none md:flex-initial pr-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
              Existing Problems
            </h2>
            <div className="gap-4 border-l-6 border-blue-anchor dark:border-gray-700 bg-gray-0 dark:bg-gray-800 py-1 px-6 mb-10">
              <p className="font text-gray-900 dark:text-gray-100">
                {" "}
                <span className="font-bold text-gray-900">
                  Lack of a Guided Flow{" "}
                </span>
                Users didn’t have a clear, linear path for creating and
                publishing episodes, leading to confusion and drop-off.
              </p>
            </div>
            <div className="gap-4 border-l-6 border-blue-anchor dark:border-gray-700 bg-gray-0 dark:bg-gray-800 py-1 px-6">
              <p className="font text-gray-900 dark:text-gray-100">
                {" "}
                <span className="font-bold text-gray-900">
                  Unclear Episode Actions{" "}
                </span>
                Status-changing actions like scheduling or publishing were not
                easily discoverable.
              </p>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <Image
              src="/epi-oldpage.png"
              alt="user research and analytics"
              width={600}
              height={300}
              className="rounded-lg border border-gray-100 dark:border-gray-700 object-cover blur-[2px]"
            />
          </div>
        </section>

        {/* Project Vision */}
        <section className="max-w-5xl w-full mb-32">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            Project Vision{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="flex flex-col gap-2 border-2 border-blue-pink1 bg-blue-pink2 rounded-lg p-6">
              <span className="text-xl font-extrabold text-blue-dark mb-2">
                👏 Self-Serve Flow
              </span>
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                to publish & edit episodes
              </p>
            </div>
            <div className="flex flex-col gap-2 border-2 border-blue-pink1 bg-blue-pink2 rounded-lg p-6">
              <span className="text-xl font-extrabold text-blue-dark mb-2">
                😊 Sufficient Instruction
              </span>
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                that explains configurations
              </p>
            </div>

            <div className="flex flex-col gap-2 border-2 border-blue-pink1 bg-blue-pink2 rounded-lg p-6">
              <span className="text-xl font-extrabold text-blue-dark mb-2">
                🥰 Reduce CX load
              </span>
              <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                & decrease support tickets
              </p>
            </div>
          </div>
        </section>

        {/* Product Shaping */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            Product Shaping
          </h2>
          <p className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left">
            After conducting researches among competitors and similar products
            like Squarespace, Mailchimp, …, it is pretty straightforward to have
            a guided flow to create the episode, and edit the episodes if
            needed. I drew various ideas from a one-page creation form, to a
            step-by-step flow.
          </p>
          <div className="flex gap-4 max-w-3xl mx-auto">
            <Image
              src="/Epi-sketch-a.jpg"
              alt="Episode Sketches"
              width={600}
              height={400}
              className="w-1/2 h-auto rounded-lg object-cover"
            />
            <Image
              src="/Epi-sketch-b.jpg"
              alt="Episode Sketches"
              width={600}
              height={400}
              className="w-1/2 h-auto rounded-lg object-cover"
            />
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
                Flow Exploration:
              </h3>
              <p className="text-md text-gray-900 dark:text-gray-300 mb-6 text-left">
                <span className="font-extrabold">
                  Flow 1 – Inline Scheduling:
                </span>{" "}
                This approach keeps everything — episode content and scheduling
                options on a single page. Users have access to two primary
                actions: “
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Save as Draft
                </span>{" "}
                ” and “
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Publish
                </span>{" "}
                ”. The ability to save at any time supports a flexible,
                exploratory workflow, where users can leave things unfinished or
                undecided until they’re ready to take a definitive step.
              </p>

              <Image
                src="/Epi-flow-1.png"
                alt="Flow 1 Inline Scheduling"
                width={1600}
                height={800}
                className="w-full mx-auto rounded-lg object-cover"
              />
            </div>
            {/* Sub-section 2 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-left">
                Flow Exploration:
              </h3>
              <p className="text-md text-gray-900 dark:text-gray-300 mb-6 text-left">
                <span className="font-extrabold">
                  Flow 2 – Schedule via Modal:
                </span>{" "}
                The main page focuses solely on episode content. Actions like “
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Save
                </span>{" "}
                ”, “
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Schedule
                </span>{" "}
                ", or "
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Publish Now
                </span>{" "}
                ” are triggered through a dedicated modal, providing a more
                guided and intentional experience.
              </p>

              <Image
                src="/Epi-flow-2.png"
                alt="Flow 2 Modal Scheduling"
                width={1600}
                height={800}
                className="w-full mx-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Manager Quote */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-12 text-gray-900 dark:text-gray-100 text-left">
            “Can We Simplify It Even Further?” — Manager’s Suggestion
          </h2>
          <div className="relative flex flex-col items-center justify-center">
            {/* Quote and icon on top */}
            <div className="flex items-center bg-blue-pink2 max-w-2xl mx-auto rounded-lg p-6 mb-8">
              <svg
                className="w-8 h-8 text-blue-pink1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 17h2v-6H5v8h4v-2H7v-2zm10-6h-4v8h4v-2h-2v-2h2v-4z" />
              </svg>
              <blockquote className="text-lg italic font text-blue-dark leading-normal text-center">
                To reduce cognitive load, we want to avoid using contextual
                buttons that change based on the episode’s status.
              </blockquote>
              <svg
                className="w-8 h-8 text-blue-pink1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 17h2v-6H5v8h4v-2H7v-2zm10-6h-4v8h4v-2h-2v-2h2v-4z" />
              </svg>
            </div>
            <div>
              <p className="text-md font-bold text-gray-900 dark:text-gray-300 mb-2 text-left">
                🤔 The question becomes: how can we streamline actions without
                sacrificing clarity?{" "}
              </p>
              <p className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left">
                As a result, we explored simplifying Flow 1 by using a single
                “Save” button, instead of dynamically showing different buttons
                like “Save as Draft” or “Update as Published”. The challenge
                lies in how users interpret this simplified action—something we
                planned to validate through testing.
              </p>
            </div>
          </div>
        </section>

        {/* User Testing */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            Usability Testing Informs Direction
          </h2>
          <div className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left">
            We tested two flows:
            <ul className="list-disc pl-6">
              <li>
                <span className="font-extrabold">
                  Flow 1 - Inline scheduling
                </span>{" "}
                with a simplified, single-action button approach.
              </li>
              <li>
                <span className="font-extrabold">
                  Flow 2 – Schedule via Modal,
                </span>{" "}
                which presents more tailored options based on user intent.
              </li>
            </ul>
            Users favored Flow 1 for its simplicity and ease of use, especially
            when making quick changes or ongoing edits. This feedback supports
            our direction toward a streamlined interaction model for episode
            management.
          </div>
        </section>

        {/* Design Episode Status Machine */}
        <section className="max-w-5xl w-full mb-20 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/5 flex-none md:flex-initial pr-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
              Design Episode Status Machine
            </h2>
            <div className="gap-4 mb-10">
              <p className="text-md text-gray-900 dark:text-gray-300 mb-6 text-left">
                Episodes can exist in one of four states:{" "}
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Draft
                </span>{" "}
                ,{" "}
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Scheduled
                </span>{" "}
                ,{" "}
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Published
                </span>{" "}
                ,{" "}
                <span className="italic font-bold text-blue-dark underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
                  Unpublished
                </span>{" "}
                .
              </p>
              <p>
                I collaborated with the Product Manager and Engineering team to
                define the logic and criteria for transitioning between these
                statuses. This structured status model also helps us handle edge
                cases and error scenarios more effectively within the
                experience.
              </p>
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <Image
              src="/epi-statusmachine.png"
              alt="user research and analytics"
              width={800}
              height={600}
              className="rounded-lg border border-gray-100 dark:border-gray-700 object-cover"
            />
          </div>
        </section>

        {/* High Fidelity */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-left">
            High Fidelity
          </h2>
          <p className="text-md text-gray-900 dark:text-gray-300 mb-8 text-left">
            Based on usability feedback, we moved forward with a single-page
            design -- includes both episode content and scheduling options, and
            display the main CTA be just "
            <span className="text-blue-dark font-extrabold underline decoration-wavy underline-offset-4 decoration-blue-pink1 dark:decoration-gray-700">
              Save
            </span>
            ".
          </p>
          <Image
            src="/Epi-final-0.png"
            alt="Episode final product design"
            width={800}
            height={400}
            className="h-auto mx-auto object-cover mb-8"
          />

          <div className="flex flex-col gap-4 mb-8">
            <div className="text-bold">
              The system interprets the user's intent based on input:
              <ul className="list-disc pl-6 mb-8">
                <li>
                  If the user has not set a publish date, the episode is saved
                  as a <span className="font-bold">draft</span>.
                </li>
                <li>
                  If a publish date is set, the episode is{" "}
                  <span className="font-bold">scheduled</span> for that date.
                </li>
                <li>
                  If the user selects "Publish Now," the episode is immediately
                  <span className="font-bold"> published</span>.
                </li>
              </ul>
              This logic enables a cleaner UI while preserving flexibility for
              different publishing scenarios.
            </div>
          </div>
          <Image
            src="/Epi-final-1.png"
            alt="Episode final product design"
            width={800}
            height={400}
            className="h-auto mx-auto object-cover mb-8"
          />
        </section>
      </main>
    </>
  );
}
