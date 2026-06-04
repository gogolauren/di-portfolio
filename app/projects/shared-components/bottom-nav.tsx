"use client";

import Link from "next/link";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function BottomNav({
  previousProject,
  previousProjectName,
  nextProject,
  nextProjectName,
  textColor = "text-purple-anchor",
  hoverColor = "hover:text-purple-dark",
  className = "max-w-5xl w-full mx-auto bg-white px-6",
}: {
  previousProject: string;
  previousProjectName: string;
  nextProject: string;
  nextProjectName: string;
  textColor?: string;
  hoverColor?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <nav
        className={`flex justify-between items-center w-full ${textColor} border-b border-gray-100 pb-10 mb-4`}
      >
        {/* Previous Project */}
        <Link
          href={previousProject}
          scroll={false}
          className={`inline-flex items-center text-sm font-bold hover:underline ${hoverColor} transition`}
        >
          👈 Previous Project: {previousProjectName}
        </Link>

        {/* Home */}
        <Link
          href="/"
          scroll={false}
          className={`text-sm font-bold hover:underline ${hoverColor} transition`}
        >
          🏠 Home
        </Link>

        {/* Next Project */}
        <Link
          href={nextProject}
          scroll={false}
          className={`text-sm font-bold hover:underline ${hoverColor} transition`}
        >
          Next Project: {nextProjectName} 👉
        </Link>
      </nav>
    </div>
  );
}
