"use client";

import { Suspense, useEffect, useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HUDCard } from "@/components/ui/HUDCard";
import { BranchSwitcher, useBranchParam } from "@/components/ui/BranchSwitcher";
import { getPricing } from "@/lib/api";
import type { PricingTier } from "@/types";

function PricingContent() {
  const activeBranch = useBranchParam();
  const [pricing, setPricing] = useState<PricingTier[]>([]);

  useEffect(() => {
    getPricing(activeBranch).then(setPricing);
  }, [activeBranch]);

  const pcTiers = pricing.filter((t) => t.type === "pc");
  const consoleTiers = pricing.filter((t) => t.type === "console");

  return (
    <div className="min-h-screen bg-cyber-black/70 backdrop-blur-xs bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="PRICING" subtitle="Choose your tier — dominate the game" />

        {/* Branch Switcher */}
        <div className="flex justify-center mb-12">
          <BranchSwitcher activeBranch={activeBranch} />
        </div>

        {/* PC Tiers */}
        <div className="mb-16">
          <h3 className="font-mono text-xs tracking-[0.4em] text-cyber-yellow uppercase mb-8 text-center">
            — PC Gaming Tiers —
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pcTiers.map((tier, i) => (
              <HUDCard
                key={tier.id}
                title={tier.tierName}
                accentColor={i === 2 ? "gold" : "yellow"}
                featured={i === 1}
                delay={i * 0.15}
              >
                <div className="text-center py-4">
                  {/* Price */}
                  <div className="mb-6">
                    <p className="font-display text-4xl font-black text-cyber-white">
                      Rs. {tier.hourlyRate}
                    </p>
                    <p className="font-mono text-[10px] text-cyber-ghost tracking-wider mt-1">
                      PER HOUR
                    </p>
                    {tier.dailyRate && (
                      <p className="font-mono text-xs text-cyber-yellow mt-2">
                        Rs. {tier.dailyRate}{" "}
                        <span className="text-cyber-ghost">/ DAY PASS</span>
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-16 h-[1px] bg-cyber-yellow/30 mx-auto mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 font-mono text-xs text-cyber-ghost"
                      >
                        <span className="w-1.5 h-1.5 bg-cyber-yellow flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </HUDCard>
            ))}
          </div>
        </div>

        {/* Console Tier */}
        <div>
          <h3 className="font-mono text-xs tracking-[0.4em] text-cyber-gold uppercase mb-8 text-center">
            — Console Gaming —
          </h3>
          <div className="max-w-md mx-auto">
            {consoleTiers.map((tier) => (
              <HUDCard
                key={tier.id}
                title={tier.tierName}
                accentColor="gold"
              >
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">🎮</div>
                  <p className="font-display text-4xl font-black text-cyber-white">
                    Rs. {tier.hourlyRate}
                  </p>
                  <p className="font-mono text-[10px] text-cyber-ghost tracking-wider mt-1 mb-6">
                    PER HOUR
                  </p>
                  {tier.dailyRate && (
                    <p className="font-mono text-xs text-cyber-gold mb-6">
                      Rs. {tier.dailyRate}{" "}
                      <span className="text-cyber-ghost">/ DAY PASS</span>
                    </p>
                  )}
                  <div className="w-16 h-[1px] bg-cyber-gold/30 mx-auto mb-6" />
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 font-mono text-xs text-cyber-ghost"
                      >
                        <span className="w-1.5 h-1.5 bg-cyber-gold flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </HUDCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cyber-black flex items-center justify-center">
          <p className="font-mono text-cyber-yellow animate-pulse">LOADING PRICING DATA...</p>
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
