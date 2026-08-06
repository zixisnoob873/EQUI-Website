"use client";

import { useEffect, useState } from "react";
import { adminFetch, toCamelCase } from "@/lib/auth";
import type { Console, BranchSlug } from "@/types";

export default function AdminConsolesPage() {
  const [branchSlug, setBranchSlug] = useState<BranchSlug>("gulberg-3");
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const loadConsoles = async (branch: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/consoles?branch=${branch}`);
      const json = await res.json();
      setConsoles(json.data ? toCamelCase<Console[]>(json.data) : []);
    } catch {
      setMessage("Failed to fetch console data from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConsoles(branchSlug);
  }, [branchSlug]);

  const handleUpdateField = (id: number, field: string, value: unknown) => {
    setConsoles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSaveConsole = async (c: Console) => {
    setSavingId(c.id);
    setMessage("");
    try {
      await adminFetch("/admin/consoles", {
        method: "POST",
        body: JSON.stringify({
          id: c.id,
          branch_id: c.branchId || (branchSlug === "gulberg-3" ? 1 : 2),
          setup_description: c.setupDescription,
          games_available: c.gamesAvailable,
          hourly_rate: Number(c.hourlyRate),
        }),
      });
      setMessage("Saved PS5 console setup successfully!");
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
            CONSOLE MANAGEMENT
          </h1>
          <p className="font-mono text-xs text-cyber-ghost mt-1 tracking-wider">
            EDIT PS5 ARENA DETAILS & AVAILABLE GAMES LIBRARY
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
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING CONSOLE DATA...</p>
      ) : (
        <div className="space-y-6">
          {consoles.map((c) => (
            <div
              key={c.id}
              className="bg-cyber-charcoal border border-cyber-gunmetal/50 p-6 relative"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-gunmetal/40">
                <h3 className="font-mono text-sm font-bold text-cyber-gold uppercase tracking-wider">
                  PLAYSTATION 5 ARENA
                </h3>
                <span className="font-mono text-[10px] text-cyber-ghost">ID: #{c.id}</span>
              </div>

              <div className="mb-4">
                <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                  Hourly Rate (PKR)
                </label>
                <input
                  type="number"
                  value={c.hourlyRate}
                  onChange={(e) => handleUpdateField(c.id, "hourlyRate", Number(e.target.value))}
                  className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                  Setup Description
                </label>
                <textarea
                  value={c.setupDescription}
                  onChange={(e) => handleUpdateField(c.id, "setupDescription", e.target.value)}
                  rows={3}
                  className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                  Available Games List (Comma Separated)
                </label>
                <textarea
                  value={c.gamesAvailable.join(", ")}
                  onChange={(e) =>
                    handleUpdateField(
                      c.id,
                      "gamesAvailable",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                  rows={4}
                  className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                />
              </div>

              <button
                onClick={() => handleSaveConsole(c)}
                disabled={savingId === c.id}
                className="px-6 py-2.5 bg-cyber-gold text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-yellow transition-colors disabled:opacity-50"
              >
                {savingId === c.id ? "SAVING..." : "SAVE PS5 ARENA DETAILS"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
