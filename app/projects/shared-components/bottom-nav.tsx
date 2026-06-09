"use client";

import Link from "next/link";

export function BottomNav({
  previousProject,
  previousProjectName,
  nextProject,
  nextProjectName,
  // kept for backward-compat, unused in new design
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
  return (
    <div className={className}>
      {/* top rule */}
      <div className="border-t border-gray-200 mt-2" />

      <div className="flex items-end justify-between py-8">
        {/* ← Previous */}
        <Link href={previousProject} className="text-left group">
          <p className="flex items-center gap-1.5 text-[11px] font-normal tracking-[0.16em] uppercase mb-2" style={{ color: "rgba(61,53,48,0.7)" }}>
            👈&nbsp;Previous
          </p>
          <p className="text-[17px] font-bold group-hover:underline transition-all" style={{ color: "#3D3530" }}>
            {previousProjectName}
          </p>
        </Link>

        {/* Home */}
        <Link
          href="/"
          className="text-[17px] font-bold hover:underline transition-all"
          style={{ color: "#3D3530" }}
        >
          🏠&nbsp;Home
        </Link>

        {/* Next → */}
        <Link href={nextProject} className="text-right group">
          <p className="flex items-center justify-end gap-1.5 text-[11px] font-normal tracking-[0.16em] uppercase mb-2" style={{ color: "rgba(61,53,48,0.7)" }}>
            Next&nbsp;👉
          </p>
          <p className="text-[17px] font-bold group-hover:underline transition-all" style={{ color: "#3D3530" }}>
            {nextProjectName}
          </p>
        </Link>
      </div>

      {/* bottom rule */}
      <div className="border-b border-gray-200" />
    </div>
  );
}
