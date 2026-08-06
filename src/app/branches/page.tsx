"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HUDCard } from "@/components/ui/HUDCard";
import { getBranches, getContact } from "@/lib/api";
import type { Branch, Contact, BranchSlug } from "@/types";

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [contactsMap, setContactsMap] = useState<Record<string, Contact>>({});

  useEffect(() => {
    getBranches().then((data) => {
      setBranches(data);
      data.forEach((b) => {
        getContact(b.slug as BranchSlug).then((contact) => {
          setContactsMap((prev) => ({ ...prev, [b.slug]: contact }));
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-metallic-subtle bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="OUR BRANCHES" subtitle="Two arenas — one mission" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {branches.map((branch, i) => {
            const contact = contactsMap[branch.slug];

            return (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <HUDCard
                  title={branch.name.toUpperCase()}
                  accentColor={i === 0 ? "yellow" : "gold"}
                >
                  <div className="space-y-6">
                    {/* Branch hero placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-cyber-charcoal to-cyber-void border border-cyber-gunmetal/30 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-grid opacity-50" />
                      <div className="relative text-center">
                        <p className="font-display text-4xl font-black text-cyber-gold text-glow-gold">
                          {branch.slug === "gulberg-3" ? "G3" : "AS"}
                        </p>
                        <p className="font-mono text-[10px] text-cyber-ghost tracking-[0.4em] mt-1">
                          {branch.city.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-mono text-sm text-cyber-ghost leading-relaxed">
                      {branch.description}
                    </p>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: "3", label: "PC Tiers" },
                        { value: "1", label: "PS5 Arena" },
                        { value: "50+", label: "Stations" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="text-center bg-cyber-charcoal/40 border border-cyber-gunmetal/20 py-3"
                        >
                          <p className="font-display text-xl font-bold text-cyber-yellow">
                            {stat.value}
                          </p>
                          <p className="font-mono text-[9px] text-cyber-ghost tracking-wider uppercase">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Info */}
                    <div className="space-y-3 border-t border-cyber-gunmetal/30 pt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">📍</span>
                        <span className="font-mono text-xs text-cyber-ghost">
                          {branch.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">📞</span>
                        <span className="font-mono text-xs text-cyber-ghost">
                          {branch.phone}
                        </span>
                      </div>
                      {contact && (
                        <div className="flex items-center gap-3">
                          <span className="text-sm">🕒</span>
                          <span className="font-mono text-xs text-cyber-yellow font-bold">
                            {contact.operatingHours.schedule || "24 / 7 / 365 DAYS"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/pcs?branch=${branch.slug}`}
                        className="flex-1 text-center bg-cyber-yellow text-cyber-black font-mono text-xs tracking-[0.2em] uppercase px-4 py-3 font-bold hover:bg-cyber-gold transition-colors"
                      >
                        View PCs →
                      </Link>
                      <Link
                        href={`/location?branch=${branch.slug}`}
                        className="flex-1 text-center border border-cyber-yellow/30 text-cyber-yellow font-mono text-xs tracking-[0.2em] uppercase px-4 py-3 hover:bg-cyber-yellow/10 transition-colors"
                      >
                        📍 Location
                      </Link>
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
