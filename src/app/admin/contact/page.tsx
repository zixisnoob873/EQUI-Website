"use client";

import { useEffect, useState } from "react";
import { adminFetch, toCamelCase } from "@/lib/auth";
import type { Contact, BranchSlug } from "@/types";

export default function AdminContactPage() {
  const [branchSlug, setBranchSlug] = useState<BranchSlug>("gulberg-3");
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadContact = async (branch: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/contacts?branch=${branch}`);
      const json = await res.json();
      setContact(json.data ? toCamelCase<Contact>(json.data) : null);
    } catch {
      setMessage("Failed to fetch contact from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContact(branchSlug);
  }, [branchSlug]);

  const handleSaveContact = async () => {
    if (!contact) return;
    setSaving(true);
    setMessage("");
    try {
      await adminFetch(`/admin/contacts/${contact.id}`, {
        method: "PUT",
        body: JSON.stringify({
          phone_primary: contact.phonePrimary,
          phone_secondary: contact.phoneSecondary,
          email: contact.email,
          whatsapp: contact.whatsapp,
          operating_hours: contact.operatingHours,
        }),
      });
      setMessage("Saved contact info successfully!");
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
            CONTACTS & OPERATING HOURS
          </h1>
          <p className="font-mono text-xs text-cyber-ghost mt-1 tracking-wider">
            EDIT PHONE NUMBERS, WHATSAPP, EMAIL, AND OPERATING HOURS
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
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING CONTACT INFO...</p>
      ) : contact ? (
        <div className="bg-cyber-charcoal border border-cyber-gunmetal/50 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                value={contact.phonePrimary}
                onChange={(e) =>
                  setContact((prev) => (prev ? { ...prev, phonePrimary: e.target.value } : prev))
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Secondary Phone / Landline
              </label>
              <input
                type="text"
                value={contact.phoneSecondary || ""}
                onChange={(e) =>
                  setContact((prev) =>
                    prev ? { ...prev, phoneSecondary: e.target.value } : prev
                  )
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={contact.whatsapp || ""}
                onChange={(e) =>
                  setContact((prev) => (prev ? { ...prev, whatsapp: e.target.value } : prev))
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Branch Email
              </label>
              <input
                type="email"
                value={contact.email || ""}
                onChange={(e) =>
                  setContact((prev) => (prev ? { ...prev, email: e.target.value } : prev))
                }
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-cyber-gunmetal/40">
            <h4 className="font-mono text-xs font-bold text-cyber-yellow uppercase mb-3">
              Operating Hours (24/7/365 Config)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                  Schedule Banner
                </label>
                <input
                  type="text"
                  value={contact.operatingHours.schedule || "24 / 7 / 365 DAYS"}
                  onChange={(e) =>
                    setContact((prev) =>
                      prev
                        ? {
                            ...prev,
                            operatingHours: { ...prev.operatingHours, schedule: e.target.value },
                          }
                        : prev
                    )
                  }
                  className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                  Operating Status Text
                </label>
                <input
                  type="text"
                  value={contact.operatingHours.status || "OPEN 24 HOURS • 7 DAYS A WEEK • 365 DAYS A YEAR"}
                  onChange={(e) =>
                    setContact((prev) =>
                      prev
                        ? {
                            ...prev,
                            operatingHours: { ...prev.operatingHours, status: e.target.value },
                          }
                        : prev
                    )
                  }
                  className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveContact}
            disabled={saving}
            className="px-6 py-2.5 bg-cyber-yellow text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-gold transition-colors disabled:opacity-50"
          >
            {saving ? "SAVING..." : "SAVE CONTACT & HOURS"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
