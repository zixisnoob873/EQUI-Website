"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HUDCard } from "@/components/ui/HUDCard";
import { BranchSwitcher, useBranchParam } from "@/components/ui/BranchSwitcher";
import { getPcTiers, getPricing } from "@/lib/api";
import type { PcTier, PricingTier } from "@/types";

function PcsContent() {
  const activeBranch = useBranchParam();
  const [tiers, setTiers] = useState<PcTier[]>([]);
  const [pricing, setPricing] = useState<PricingTier[]>([]);

  useEffect(() => {
    getPcTiers(activeBranch).then(setTiers);
    getPricing(activeBranch).then(setPricing);
  }, [activeBranch]);

  const pcPricing = pricing.filter((t) => t.type === "pc");
  const tierAccents: ("yellow" | "gold")[] = ["yellow", "yellow", "gold"];

  return (
    <div className="min-h-screen bg-cyber-black/70 backdrop-blur-xs bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="PC SETUPS" subtitle="Three tiers of pure power" />

        <div className="flex justify-center mb-12">
          <BranchSwitcher activeBranch={activeBranch} />
        </div>

        <div className="space-y-16">
          {tiers.map((tier, i) => {
            const price = pcPricing.find(
              (p) => p.tierName === tier.tierName
            );

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <HUDCard
                  title={`${tier.tierName} — ${tier.cpu.split(" ").slice(-1)}`}
                  accentColor={tierAccents[i] || "yellow"}
                  featured={i === 2}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Specs side */}
                    <div>
                      <p className="font-mono text-sm text-cyber-ghost leading-relaxed mb-6">
                        {tier.description}
                      </p>

                      {/* Specs table */}
                      <div className="space-y-3">
                        {[
                          { label: "CPU", value: tier.cpu },
                          { label: "GPU", value: tier.gpu },
                          { label: "RAM", value: tier.ram },
                          { label: "MONITOR", value: tier.monitor },
                        ].map((spec) => (
                          <div
                            key={spec.label}
                            className="flex items-start gap-4 border-b border-cyber-gunmetal/30 pb-3"
                          >
                            <span className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase w-20 flex-shrink-0 pt-0.5">
                              {spec.label}
                            </span>
                            <span className="font-mono text-xs text-cyber-white">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Peripherals */}
                      {tier.peripherals && (
                        <div className="mt-6">
                          <h4 className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-3">
                            Peripherals
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(tier.peripherals).map(
                              ([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-cyber-yellow/60 flex-shrink-0" />
                                  <span className="font-mono text-[11px] text-cyber-ghost">
                                    <span className="text-cyber-steel">{key}:</span>{" "}
                                    {value}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pricing/visual side */}
                    <div className="flex flex-col items-center justify-center bg-cyber-charcoal/40 border border-cyber-gunmetal/30 p-8">
                      <div className="text-6xl mb-4">
                        {i === 0 ? "🖥️" : i === 1 ? "⚡" : "👑"}
                      </div>
                      <p className="font-display text-2xl font-bold tracking-wider text-cyber-yellow mb-1">
                        {tier.tierName.toUpperCase()}
                      </p>
                      {price && (
                        <>
                          <p className="font-display text-5xl font-black text-cyber-white mt-4">
                            Rs. {price.hourlyRate}
                          </p>
                          <p className="font-mono text-[10px] text-cyber-ghost tracking-wider mt-1">
                            PER HOUR
                          </p>
                          {price.dailyRate && (
                            <p className="font-mono text-sm text-cyber-yellow mt-3">
                              Rs. {price.dailyRate}
                              <span className="text-cyber-ghost"> / DAY</span>
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </HUDCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PcsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cyber-black flex items-center justify-center">
          <p className="font-mono text-cyber-yellow animate-pulse">LOADING PC SPECS...</p>
        </div>
      }
    >
      <PcsContent />
    </Suspense>
  );
}
