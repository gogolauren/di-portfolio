"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function BottomNav({
  previousProject,
  previousProjectName,
  nextProject,
  nextProjectName,
  // kept for backward-compat but no longer used in the new design
  textColor: _textColor,
  hoverColor: _hoverColor,
  className = "max-w-5xl w-full mx-auto px-6",
}: {
  previousProject: string;
  previousProjectName: string;
  nextProject: string;
  nextProjectName: string;
  textColor?: string;
  hoverColor?: string;
  className?: string;
}) {
  const router = useRouter();

  // Scroll to top instantly, then push — fixes the "lands mid-page" bug
  const go = (href: string) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    router.push(href);
  };

  return (
    <div className={className}>
      {/* top rule */}
      <div className="border-t border-gray-200 mt-2" />

      <div className="flex items-center justify-between py-8">
        {/* ← Previous */}
        <button
          onClick={() => go(previousProject)}
          className="text-left group cursor-pointer"
        >
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-400 mb-2">
            👈&nbsp;Previous
          </p>
          <p className="text-xl font-bold text-gray-900 group-hover:underline transition-all">
            {previousProjectName}
          </p>
        </button>

        {/* Home */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className="text-sm font-bold text-gray-700 hover:underline transition-all"
        >
          🏠&nbsp;Home
        </Link>

        {/* Next → */}
        <button
          onClick={() => go(nextProject)}
          className="text-right group cursor-pointer"
        >
          <p className="flex items-center justify-end gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-400 mb-2">
            Next&nbsp;👉
          </p>
          <p className="text-xl font-bold text-gray-900 group-hover:underline transition-all">
            {nextProjectName}
          </p>
        </button>
      </div>

      {/* bottom rule */}
      <div className="border-b border-gray-200" />
    </div>
  );
}
