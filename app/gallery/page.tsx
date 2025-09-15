"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../projects/shared-components/footer";

// Interior Design Items
const interiorDesignItems = [
  {
    src: "/gallery/Gallery-drawing01.jpg",
    alt: "Interior Design Drawing 01",
    caption: "Partition Plan",
  },
  {
    src: "/gallery/Gallery-drawing02.jpg",
    alt: "Interior Design Drawing 02",
    caption: "Reflected Ceiling Plan",
  },
  {
    src: "/gallery/Gallery-drawing03.jpg",
    alt: "Interior Design Drawing 03",
    caption: "Elevations",
  },
  {
    src: "/gallery/Gallery-drawing04.jpg",
    alt: "Interior Design Drawing 04",
    caption: "Axonometric Plan",
  },
  {
    src: "/gallery/Gallery-drawing05.jpg",
    alt: "Interior Design Drawing 05",
    caption: "1 point perspective drawing",
  },
  {
    src: "/gallery/Gallery-drawing06.jpg",
    alt: "Interior Design Drawing 06",
    caption: "2 points perspective drawing",
  },
];

// Photography Items
const photographyItems = Array.from({ length: 20 }, (_, i) => ({
  src: `/gallery/Gallery-pic${i + 1}.jpg`,
  alt: `Photography ${i + 1}`,
  caption: `Gallery Pic ${i + 1}`,
  // Optionally add orientation if you want different sizes
}));

export default function GalleryPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#F6F7F1]">
      <header className="w-full bg-beige-tint1 border-b border-beige-base mb-12">
        <nav className="max-w-6xl mx-auto flex items-center py-3">
          <div className="flex items-center justify-between w-full">
            <Link
              href="/"
              className="text-4xl font-clash-grotesk text-golden-anchor font-bold hover:text-beige-anchor"
            >
              Di.X
            </Link>
          </div>
        </nav>
      </header>

    

      {/* Photography Section */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-sm font-bold text-gray-700 font-[var(--font-clash-grotesk)] mb-6 text-left">
          Photography
        </h2>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {photographyItems.map((item, idx) => (
            <div
              key={idx}
              className="break-inside-avoid mb-6 transition bg-white"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={900}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Interior Design Section */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-sm font-bold text-gray-700 font-[var(--font-clash-grotesk)] mb-6 text-left">
          Interior Design
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {interiorDesignItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-full relative overflow-hidden transition">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="object-cover w-full h-auto"
                />
              </div>
              {/*<span className="mt-4 text-base text-gray-800 text-center">
                {item.caption}
              </span>*/}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer customValue="max-w-6xl" />
    </main>
  );
}
