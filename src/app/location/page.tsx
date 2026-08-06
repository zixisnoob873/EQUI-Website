"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HUDCard } from "@/components/ui/HUDCard";
import { BranchSwitcher, useBranchParam } from "@/components/ui/BranchSwitcher";
import { getBranch, getContact } from "@/lib/api";
import type { Branch, Contact } from "@/types";

function LocationContent() {
  const activeBranch = useBranchParam();
  const [branch, setBranch] = useState<Branch | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    getBranch(activeBranch).then(setBranch);
    getContact(activeBranch).then(setContact);
  }, [activeBranch]);

  if (!branch || !contact) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING MAP DATA...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-metallic-subtle bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="FIND US" subtitle="Locate your nearest arena" />

        <div className="flex justify-center mb-12">
          <BranchSwitcher activeBranch={activeBranch} />
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative border border-cyber-yellow/30"
          >
            <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-cyber-yellow z-10" />
            <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-cyber-yellow z-10" />
            <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-cyber-yellow z-10" />
            <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-cyber-yellow z-10" />

            <iframe
              src={branch.mapsEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${branch.name} Location`}
              className="w-full grayscale-[30%] contrast-125"
            />
          </motion.div>

          {/* Address & details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HUDCard title={`${branch.name}`} accentColor="yellow">
              <div className="space-y-4 py-2">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                      Address
                    </p>
                    <p className="font-mono text-sm text-cyber-white leading-relaxed">
                      {branch.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                      Phone
                    </p>
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, "")}`}
                      className="font-mono text-sm text-cyber-white hover:text-cyber-yellow transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🕒</span>
                  <div>
                    <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                      Hours Today
                    </p>
                    <p className="font-mono text-sm text-cyber-white">
                      {contact.operatingHours.weekdays}
                    </p>
                  </div>
                </div>
              </div>
            </HUDCard>

            <HUDCard title="DIRECTIONS" accentColor="gold">
              <div className="py-2 space-y-4">
                <p className="font-mono text-sm text-cyber-ghost leading-relaxed">
                  {branch.description}
                </p>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${branch.mapsLat},${branch.mapsLng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyber-yellow text-cyber-black font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 font-bold hover:bg-cyber-gold transition-colors duration-200"
                >
                  🧭 Get Directions →
                </a>

                <div className="mt-4 pt-4 border-t border-cyber-gunmetal/30">
                  <p className="font-mono text-[9px] text-cyber-steel tracking-wider">
                    COORDS: {branch.mapsLat.toFixed(4)}°N, {branch.mapsLng.toFixed(4)}°E
                  </p>
                </div>
              </div>
            </HUDCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LocationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cyber-black flex items-center justify-center">
          <p className="font-mono text-cyber-yellow animate-pulse">LOADING MAP DATA...</p>
        </div>
      }
    >
      <LocationContent />
    </Suspense>
  );
}
