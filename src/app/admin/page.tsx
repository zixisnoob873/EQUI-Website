"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HUDCard } from "@/components/ui/HUDCard";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    branches: 2,
    pcTiers: 6,
    consoles: 2,
    galleryImages: 6,
  });

  useEffect(() => {
    // Fetch stats from backend if online
    fetch("http://127.0.0.1:8000/api/branches")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setStats((prev) => ({ ...prev, branches: data.data.length }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black text-cyber-white tracking-wider uppercase">
          CONTROL CENTER
        </h1>
        <p className="font-mono text-xs text-cyber-ghost mt-1 tracking-wider">
          SYSTEM OVERVIEW & QUICK EDIT MANAGEMENT
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Active Branches", value: stats.branches, href: "/admin/branches", icon: "📍" },
          { label: "PC Specs Managed", value: stats.pcTiers, href: "/admin/pcs", icon: "🖥️" },
          { label: "Console Arenas", value: stats.consoles, href: "/admin/consoles", icon: "🎮" },
          { label: "Gallery Photos", value: stats.galleryImages, href: "/admin/gallery", icon: "🖼️" },
        ].map((item) => (
          <Link href={item.href} key={item.label}>
            <HUDCard title={item.label.toUpperCase()} accentColor="yellow">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-display text-4xl font-black text-cyber-yellow">
                    {item.value}
                  </p>
                  <p className="font-mono text-[10px] text-cyber-ghost mt-1">
                    Click to edit →
                  </p>
                </div>
                <span className="text-4xl">{item.icon}</span>
              </div>
            </HUDCard>
          </Link>
        ))}
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HUDCard title="BRANCH MANAGEMENT" accentColor="yellow">
          <p className="font-mono text-xs text-cyber-ghost leading-relaxed mb-4">
            Edit Gulberg 3 and Airline Society addresses, phone numbers, map coordinates, and descriptions.
          </p>
          <Link
            href="/admin/branches"
            className="inline-block px-4 py-2 bg-cyber-yellow text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-gold transition-colors"
          >
            Manage Branches →
          </Link>
        </HUDCard>

        <HUDCard title="PRICING MANAGEMENT" accentColor="gold">
          <p className="font-mono text-xs text-cyber-ghost leading-relaxed mb-4">
            Update hourly rates, day pass pricing, and feature highlights for Tier 1, 2, 3 PCs and PS5 console.
          </p>
          <Link
            href="/admin/pricing"
            className="inline-block px-4 py-2 bg-cyber-gold text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-yellow transition-colors"
          >
            Manage Pricing →
          </Link>
        </HUDCard>

        <HUDCard title="PC HARDWARE SPECS" accentColor="yellow">
          <p className="font-mono text-xs text-cyber-ghost leading-relaxed mb-4">
            Modify CPU, GPU, RAM, Monitor, and Peripherals for all 3 gaming tiers per branch.
          </p>
          <Link
            href="/admin/pcs"
            className="inline-block px-4 py-2 bg-cyber-yellow text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-gold transition-colors"
          >
            Manage PC Setups →
          </Link>
        </HUDCard>

        <HUDCard title="PHOTOSHOOT & GALLERY" accentColor="gold">
          <p className="font-mono text-xs text-cyber-ghost leading-relaxed mb-4">
            Upload new photoshoot images, set categories (Setups, Events, Ambiance), and toggle featured items.
          </p>
          <Link
            href="/admin/gallery"
            className="inline-block px-4 py-2 bg-cyber-gold text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-yellow transition-colors"
          >
            Manage Gallery →
          </Link>
        </HUDCard>
      </div>
    </div>
  );
}
