"use client";

import { useEffect, useState } from "react";
import { adminFetch, toCamelCase } from "@/lib/auth";
import type { PricingTier, BranchSlug } from "@/types";

export default function AdminPricingPage() {
  const [branchSlug, setBranchSlug] = useState<BranchSlug>("gulberg-3");
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const loadPricing = async (branch: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/pricing?branch=${branch}`);
      const json = await res.json();
      setPricingTiers(json.data ? toCamelCase<PricingTier[]>(json.data) : []);
    } catch {
      setMessage("Failed to fetch pricing from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricing(branchSlug);
  }, [branchSlug]);

  const handleUpdateField = (id: number, field: string, value: unknown) => {
    setPricingTiers((prev) =>
      prev.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier))
    );
  };

  const handleSaveTier = async (tier: PricingTier) => {
    setSavingId(tier.id);
    setMessage("");
    try {
      await adminFetch("/admin/pricing", {
        method: "POST",
        body: JSON.stringify({
          id: tier.id,
          branch_id: tier.branchId || (branchSlug === "gulberg-3" ? 1 : 2),
          tier_name: tier.tierName,
          type: tier.type,
          hourly_rate: Number(tier.hourlyRate),
          daily_rate: tier.dailyRate ? Number(tier.dailyRate) : null,
          features: tier.features,
        }),
      });
      setMessage(`Saved ${tier.tierName} successfully!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save";
      setMessage(`Error: ${msg}`);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black text-cyber-white tracking-wider uppercase">
            PRICING MANAGEMENT
          </h1>
          <p className="font-mono text-xs text-cyber-ghost mt-1 tracking-wider">
            EDIT HOURLY RATES, DAY PASSES, AND FEATURE HIGHLIGHTS
          </p>
        </div>

        {/* Branch Selector */}
        <div className="flex border border-cyber-gunmetal">
          <button
            onClick={() => setBranchSlug("gulberg-3")}
            className={`px-4 py-2 font-mono text-xs tracking-wider uppercase ${
              branchSlug === "gulberg-3"
                ? "bg-cyber-yellow text-cyber-black font-bold"
                : "text-cyber-ghost hover:text-cyber-yellow"
            }`}
          >
            Gulberg 3
          </button>
          <button
            onClick={() => setBranchSlug("airline-society")}
            className={`px-4 py-2 font-mono text-xs tracking-wider uppercase ${
              branchSlug === "airline-society"
                ? "bg-cyber-yellow text-cyber-black font-bold"
                : "text-cyber-ghost hover:text-cyber-yellow"
            }`}
          >
            Airline Society
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-cyber-charcoal border border-cyber-yellow/50 text-cyber-yellow font-mono text-xs">
          ℹ️ {message}
        </div>
      )}

      {loading ? (
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING PRICING DATA...</p>
      ) : (
        <div className="space-y-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-cyber-charcoal border border-cyber-gunmetal/50 p-6 relative"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-gunmetal/40">
                <h3 className="font-mono text-sm font-bold text-cyber-yellow uppercase tracking-wider">
                  {tier.tierName} ({tier.type.toUpperCase()})
                </h3>
                <span className="font-mono text-[10px] text-cyber-ghost">ID: #{tier.id}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                    Hourly Rate (PKR)
                  </label>
                  <input
                    type="number"
                    value={tier.hourlyRate}
                    onChange={(e) =>
                      handleUpdateField(tier.id, "hourlyRate", Number(e.target.value))
                    }
                    className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                    Daily Rate (PKR)
                  </label>
                  <input
                    type="number"
                    value={tier.dailyRate || ""}
                    onChange={(e) =>
                      handleUpdateField(
                        tier.id,
                        "dailyRate",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                  Features List (Comma Separated)
                </label>
                <input
                  type="text"
                  value={tier.features.join(", ")}
                  onChange={(e) =>
                    handleUpdateField(
                      tier.id,
                      "features",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                  className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                />
              </div>

              <button
                onClick={() => handleSaveTier(tier)}
                disabled={savingId === tier.id}
                className="px-6 py-2.5 bg-cyber-yellow text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-gold transition-colors disabled:opacity-50"
              >
                {savingId === tier.id ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
