"use client";

import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BranchSwitcher, useBranchParam } from "@/components/ui/BranchSwitcher";
import { Lightbox } from "@/components/ui/Lightbox";
import { getGallery } from "@/lib/api";
import type { GalleryCategory, GalleryImage } from "@/types";

const CATEGORIES: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "setup", label: "SETUPS" },
  { value: "events", label: "EVENTS" },
  { value: "ambiance", label: "AMBIANCE" },
  { value: "gaming", label: "GAMING" },
];

function GalleryContent() {
  const activeBranch = useBranchParam();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    getGallery(activeBranch).then(setImages);
  }, [activeBranch]);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-metallic-subtle bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="GALLERY" subtitle="A glimpse into the arena" />

        <div className="flex justify-center mb-8">
          <BranchSwitcher activeBranch={activeBranch} />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 font-mono text-[10px] tracking-[0.25em] uppercase border transition-all duration-200 cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-cyber-yellow text-cyber-black border-cyber-yellow font-bold"
                  : "border-cyber-gunmetal text-cyber-ghost hover:border-cyber-yellow/50 hover:text-cyber-yellow"
              }`}
              id={`gallery-filter-${cat.value}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer border border-cyber-gunmetal/30 overflow-hidden"
                onClick={() =>
                  setLightboxImage({ url: image.imageUrl, caption: image.caption })
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.thumbnailUrl || image.imageUrl}
                  alt={image.caption}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyber-black/0 group-hover:bg-cyber-black/70 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-mono text-xs text-cyber-white mb-1">
                      {image.caption}
                    </p>
                    <p className="font-mono text-[9px] text-cyber-yellow tracking-wider uppercase">
                      {image.category}
                    </p>
                  </div>
                </div>

                {image.isFeatured && (
                  <div className="absolute top-2 right-2 bg-cyber-yellow text-cyber-black font-mono text-[8px] tracking-wider px-2 py-0.5 uppercase font-bold">
                    ★ Featured
                  </div>
                )}

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-cyber-ghost">No images in this category yet.</p>
          </div>
        )}
      </div>

      <Lightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage?.url || ""}
        caption={lightboxImage?.caption}
      />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cyber-black flex items-center justify-center">
          <p className="font-mono text-cyber-yellow animate-pulse">LOADING GALLERY...</p>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
