import Link from "next/link";

export function BottomNav({
  previousProject,
  previousProjectName,
  nextProject,
  nextProjectName,
  textColor = "text-purple-anchor",
  hoverColor = "hover:text-purple-dark",
}: {
  previousProject: string;
  previousProjectName: string;
  nextProject: string;
  nextProjectName: string;
  textColor?: string;
  hoverColor?: string;
}) {
  return (
    <div className="max-w-5xl w-full mx-auto bg-white px-6">
      <nav
        className={`flex justify-between items-center w-full ${textColor} border-b border-gray-100 pb-10 mb-4`}
      >
        {/* Previous Project */}
        <Link
          href={previousProject}
          className={`inline-flex items-center text-sm font-bold hover:underline ${hoverColor} transition`}
        >
          👈 Previous Project: {previousProjectName}
        </Link>

        {/* Home */}
        <Link
          href="/"
          className={`text-sm font-bold hover:underline ${hoverColor} transition`}
        >
          🏠 Home
        </Link>

        {/* Next Project */}
        <Link
          href={nextProject}
          className={`text-sm font-bold hover:underline ${hoverColor} transition`}
        >
          Next Project: {nextProjectName} 👉
        </Link>
      </nav>
    </div>
  );
}
