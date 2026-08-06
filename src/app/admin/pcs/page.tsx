"use client";

import { useEffect, useState } from "react";
import { adminFetch, toCamelCase } from "@/lib/auth";
import type { PcTier, BranchSlug } from "@/types";

export default function AdminPcsPage() {
  const [branchSlug, setBranchSlug] = useState<BranchSlug>("gulberg-3");
  const [pcTiers, setPcTiers] = useState<PcTier[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const loadPcs = async (branch: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/pc-tiers?branch=${branch}`);
      const json = await res.json();
      setPcTiers(json.data ? toCamelCase<PcTier[]>(json.data) : []);
    } catch {
      setMessage("Failed to fetch PC specs from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPcs(branchSlug);
  }, [branchSlug]);

  const handleUpdateField = (id: number, field: string, value: unknown) => {
    setPcTiers((prev) =>
      prev.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier))
    );
  };

  const handleSaveTier = async (tier: PcTier) => {
    setSavingId(tier.id);
    setMessage("");
    try {
      await adminFetch("/admin/pc-tiers", {
        method: "POST",
        body: JSON.stringify({
          id: tier.id,
          branch_id: tier.branchId || (branchSlug === "gulberg-3" ? 1 : 2),
          tier_name: tier.tierName,
          cpu: tier.cpu,
          gpu: tier.gpu,
          ram: tier.ram,
          monitor: tier.monitor,
          peripherals: tier.peripherals,
          description: tier.description,
        }),
      });
      setMessage(`Saved ${tier.tierName} specs successfully!`);
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
            PC SETUPS MANAGEMENT
          </h1>
          <p className="font-mono text-xs text-cyber-ghost mt-1 tracking-wider">
            EDIT CPU, GPU, RAM, MONITOR, AND PERIPHERALS SPECS
          </p>
        </div>

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
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING PC SPECS...</p>
      ) : (
        <div className="space-y-6">
          {pcTiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-cyber-charcoal border border-cyber-gunmetal/50 p-6 relative"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-gunmetal/40">
                <h3 className="font-mono text-sm font-bold text-cyber-yellow uppercase tracking-wider">
                  {tier.tierName} SPECS
                </h3>
                <span className="font-mono text-[10px] text-cyber-ghost">ID: #{tier.id}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                    CPU (Processor)
                  </label>
                  <input
                    type="text"
                    value={tier.cpu}
                    onChange={(e) => handleUpdateField(tier.id, "cpu", e.target.value)}
                    className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                    GPU (Graphics Card)
                  </label>
                  <input
                    type="text"
                    value={tier.gpu}
                    onChange={(e) => handleUpdateField(tier.id, "gpu", e.target.value)}
                    className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                    RAM (Memory)
                  </label>
                  <input
                    type="text"
                    value={tier.ram}
                    onChange={(e) => handleUpdateField(tier.id, "ram", e.target.value)}
                    className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                    Monitor (Display)
                  </label>
                  <input
                    type="text"
                    value={tier.monitor}
                    onChange={(e) => handleUpdateField(tier.id, "monitor", e.target.value)}
                    className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                  Description
                </label>
                <textarea
                  value={tier.description}
                  onChange={(e) => handleUpdateField(tier.id, "description", e.target.value)}
                  rows={2}
                  className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                />
              </div>

              <button
                onClick={() => handleSaveTier(tier)}
                disabled={savingId === tier.id}
                className="px-6 py-2.5 bg-cyber-yellow text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-gold transition-colors disabled:opacity-50"
              >
                {savingId === tier.id ? "SAVING..." : "SAVE PC SPECS"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
