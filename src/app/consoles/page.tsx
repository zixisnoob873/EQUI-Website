"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HUDCard } from "@/components/ui/HUDCard";
import { BranchSwitcher, useBranchParam } from "@/components/ui/BranchSwitcher";
import { getConsoles } from "@/lib/api";
import type { Console } from "@/types";

function ConsolesContent() {
  const activeBranch = useBranchParam();
  const [consoles, setConsoles] = useState<Console[]>([]);

  useEffect(() => {
    getConsoles(activeBranch).then(setConsoles);
  }, [activeBranch]);

  return (
    <div className="min-h-screen bg-cyber-black/70 backdrop-blur-xs bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="CONSOLES" subtitle="PlayStation 5 — Next-gen gaming" />

        <div className="flex justify-center mb-12">
          <BranchSwitcher activeBranch={activeBranch} />
        </div>

        {consoles.map((consoleItem) => (
          <div key={consoleItem.id} className="max-w-4xl mx-auto">
            <HUDCard title="PLAYSTATION 5" accentColor="gold">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Info side */}
                <div>
                  <div className="text-center lg:text-left mb-6">
                    <span className="text-7xl">🎮</span>
                  </div>

                  <p className="font-mono text-sm text-cyber-ghost leading-relaxed mb-6">
                    {consoleItem.setupDescription}
                  </p>

                  <div className="bg-cyber-charcoal/50 border border-cyber-gold/20 p-6 text-center mb-6">
                    <p className="font-display text-5xl font-black text-cyber-white">
                      Rs. {consoleItem.hourlyRate}
                    </p>
                    <p className="font-mono text-[10px] text-cyber-ghost tracking-wider mt-1">
                      PER HOUR
                    </p>
                  </div>
                </div>

                {/* Games side */}
                <div>
                  <h4 className="font-mono text-[10px] text-cyber-gold tracking-[0.4em] uppercase mb-4">
                    Available Games ({consoleItem.gamesAvailable.length}+)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {consoleItem.gamesAvailable.map((game) => (
                      <motion.div
                        key={game}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 py-1.5 border-b border-cyber-gunmetal/20"
                      >
                        <span className="w-1 h-1 bg-cyber-gold flex-shrink-0" />
                        <span className="font-mono text-[11px] text-cyber-ghost truncate">
                          {game}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] text-cyber-steel mt-4 tracking-wider">
                    AND MANY MORE — ASK AT THE COUNTER
                  </p>
                </div>
              </div>
            </HUDCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConsolesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cyber-black flex items-center justify-center">
          <p className="font-mono text-cyber-yellow animate-pulse">LOADING CONSOLE DATA...</p>
        </div>
      }
    >
      <ConsolesContent />
    </Suspense>
  );
}
