"use client";

import { useEffect, useState } from "react";
import { adminFetch, toCamelCase } from "@/lib/auth";
import type { Branch, BranchSlug } from "@/types";

export default function AdminBranchesPage() {
  const [branchSlug, setBranchSlug] = useState<BranchSlug>("gulberg-3");
  const [branch, setBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadBranch = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/branches/${slug}`);
      const json = await res.json();
      setBranch(json.data ? toCamelCase<Branch>(json.data) : null);
    } catch {
      setMessage("Failed to fetch branch from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranch(branchSlug);
  }, [branchSlug]);

  const handleSaveBranch = async () => {
    if (!branch) return;
    setSaving(true);
    setMessage("");
    try {
      await adminFetch(`/admin/branches/${branch.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: branch.name,
          address: branch.address,
          phone: branch.phone,
          maps_lat: Number(branch.mapsLat),
          maps_lng: Number(branch.mapsLng),
          maps_embed_url: branch.mapsEmbedUrl,
          description: branch.description,
        }),
      });
      setMessage("Saved branch details successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save";
      setMessage(`Error: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black text-cyber-white tracking-wider uppercase">
            BRANCH MANAGEMENT
          </h1>
          <p className="font-mono text-xs text-cyber-ghost mt-1 tracking-wider">
            EDIT BRANCH NAME, ADDRESS, GOOGLE MAPS EMBED, & COORDS
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
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING BRANCH DATA...</p>
      ) : branch ? (
        <div className="bg-cyber-charcoal border border-cyber-gunmetal/50 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Branch Name
              </label>
              <input
                type="text"
                value={branch.name}
                onChange={(e) =>
                  setBranch((prev) => (prev ? { ...prev, name: e.target.value } : prev))
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={branch.phone}
                onChange={(e) =>
                  setBranch((prev) => (prev ? { ...prev, phone: e.target.value } : prev))
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
              Full Address
            </label>
            <input
              type="text"
              value={branch.address}
              onChange={(e) =>
                setBranch((prev) => (prev ? { ...prev, address: e.target.value } : prev))
              }
              className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Map Latitude (Lat)
              </label>
              <input
                type="number"
                step="any"
                value={branch.mapsLat}
                onChange={(e) =>
                  setBranch((prev) =>
                    prev ? { ...prev, mapsLat: Number(e.target.value) } : prev
                  )
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Map Longitude (Lng)
              </label>
              <input
                type="number"
                step="any"
                value={branch.mapsLng}
                onChange={(e) =>
                  setBranch((prev) =>
                    prev ? { ...prev, mapsLng: Number(e.target.value) } : prev
                  )
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
              Google Maps Embed URL
            </label>
            <textarea
              value={branch.mapsEmbedUrl}
              onChange={(e) =>
                setBranch((prev) => (prev ? { ...prev, mapsEmbedUrl: e.target.value } : prev))
              }
              rows={3}
              className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-xs text-cyber-white focus:border-cyber-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
              Branch Overview Description
            </label>
            <textarea
              value={branch.description}
              onChange={(e) =>
                setBranch((prev) => (prev ? { ...prev, description: e.target.value } : prev))
              }
              rows={3}
              className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
            />
          </div>

          <button
            onClick={handleSaveBranch}
            disabled={saving}
            className="px-6 py-2.5 bg-cyber-yellow text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-gold transition-colors disabled:opacity-50"
          >
            {saving ? "SAVING..." : "SAVE BRANCH DETAILS"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
