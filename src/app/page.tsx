"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { StartButton } from "@/components/ui/StartButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HUDCard } from "@/components/ui/HUDCard";
import Link from "next/link";

// Lazy load 3D background to avoid SSR issues
const CyberBackground = dynamic(
  () =>
    import("@/components/3d/CyberBackground").then((mod) => ({
      default: mod.CyberBackground,
    })),
  { ssr: false }
);

const FEATURES = [
  {
    icon: "🖥️",
    title: "3-TIER PCs",
    desc: "From competitive esports to 4K ultra — pick your tier.",
    href: "/pcs",
  },
  {
    icon: "🎮",
    title: "PS5 ARENA",
    desc: "4K displays, DualSense, and 200+ games.",
    href: "/consoles",
  },
  {
    icon: "📍",
    title: "2 BRANCHES",
    desc: "Gulberg 3 & Airline Society — game near you.",
    href: "/branches",
  },
  {
    icon: "🏆",
    title: "TOURNAMENTS",
    desc: "Weekly competitive events with prizes.",
    href: "/gallery",
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <CyberBackground />

        {/* Vignette + scanline overlays */}
        <div className="absolute inset-0 z-[1] vignette" />
        <div className="absolute inset-0 z-[2] scanline-overlay pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-16">
          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-cyber-green tracking-[0.4em] uppercase">
              Servers Online — 2 Locations Active
            </span>
          </motion.div>

          {/* Official Logo Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center justify-center mb-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Equilibrium Gaming Logo"
              className="h-32 sm:h-44 md:h-52 w-auto object-contain drop-shadow-[0_0_25px_rgba(245,166,35,0.4)]"
            />
          </motion.div>

          {/* Title & Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] text-cyber-gold text-glow-gold mb-2"
          >
            EQUILIBRIUM
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="font-mono text-sm sm:text-base text-cyber-yellow tracking-[0.5em] uppercase font-bold mb-1">
              — A TIER ABOVE —
            </p>
            <p className="font-mono text-xs text-cyber-ghost tracking-[0.3em] uppercase">
              PREMIUM GAMING LOUNGE • GULBERG 3 & AIRLINE SOCIETY, LAHORE
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-12"
          >
            <StartButton href="/pcs" label="ENTER THE ARENA" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[9px] text-cyber-ghost tracking-[0.4em] uppercase">
                Scroll
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-cyber-yellow/50 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="relative py-24 sm:py-32 bg-metallic-subtle bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="WHAT WE OFFER"
            subtitle="Choose your weapon"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <Link href={feature.href} key={feature.title}>
                <HUDCard delay={i * 0.1}>
                  <div className="text-center py-4">
                    <span className="text-4xl mb-4 block">{feature.icon}</span>
                    <h3 className="font-display text-sm font-bold tracking-[0.2em] text-cyber-yellow mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-mono text-[11px] text-cyber-ghost leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </HUDCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative py-20 bg-cyber-void border-t border-b border-cyber-yellow/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Gaming Stations" },
              { value: "3", label: "PC Tiers" },
              { value: "2", label: "Locations" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl sm:text-5xl font-black text-cyber-yellow text-glow-yellow mb-1">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] text-cyber-ghost tracking-[0.3em] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24 bg-metallic bg-grid overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionTitle
            title="READY TO PLAY?"
            subtitle="Pick a branch and start gaming"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/branches?branch=gulberg-3"
              className="w-full sm:w-auto px-8 py-4 bg-cyber-charcoal border border-cyber-yellow/30 font-mono text-xs tracking-[0.25em] text-cyber-yellow hover:bg-cyber-yellow hover:text-cyber-black transition-all duration-300 text-center uppercase"
            >
              📍 Gulberg 3
            </Link>
            <Link
              href="/branches?branch=airline-society"
              className="w-full sm:w-auto px-8 py-4 bg-cyber-charcoal border border-cyber-gold/30 font-mono text-xs tracking-[0.25em] text-cyber-gold hover:bg-cyber-gold hover:text-cyber-black transition-all duration-300 text-center uppercase"
            >
              📍 Airline Society
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
