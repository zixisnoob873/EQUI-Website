"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HUDCardProps {
  children: ReactNode;
  title?: string;
  accentColor?: "yellow" | "gold" | "red" | "green";
  className?: string;
  featured?: boolean;
  delay?: number;
}

const accentMap = {
  yellow: {
    border: "border-cyber-yellow/30 hover:border-cyber-yellow/70",
    headerBg: "bg-cyber-yellow",
    headerText: "text-cyber-black",
    glow: "hover:shadow-neon-yellow",
  },
  gold: {
    border: "border-cyber-gold/30 hover:border-cyber-gold/70",
    headerBg: "bg-cyber-gold",
    headerText: "text-cyber-black",
    glow: "hover:shadow-neon-gold",
  },
  red: {
    border: "border-cyber-red/30 hover:border-cyber-red/70",
    headerBg: "bg-cyber-red",
    headerText: "text-white",
    glow: "hover:shadow-neon-red",
  },
  green: {
    border: "border-cyber-green/30 hover:border-cyber-green/70",
    headerBg: "bg-cyber-green",
    headerText: "text-cyber-black",
    glow: "",
  },
};

export function HUDCard({
  children,
  title,
  accentColor = "yellow",
  className = "",
  featured = false,
  delay = 0,
}: HUDCardProps) {
  const accent = accentMap[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative bg-cyber-charcoal/60 backdrop-blur-sm border ${accent.border} ${accent.glow} transition-all duration-300 group ${className} ${featured ? "ring-1 ring-cyber-yellow/20" : ""}`}
    >
      {/* Corner accents */}
      <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-cyber-yellow opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-cyber-yellow opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-cyber-yellow opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-cyber-yellow opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Optional header bar */}
      {title && (
        <div className={`px-5 py-2.5 ${accent.headerBg} flex items-center gap-3`}>
          <div className="w-2 h-2 bg-current opacity-60" />
          <h3
            className={`font-mono text-xs tracking-[0.25em] uppercase font-bold ${accent.headerText}`}
          >
            {title}
          </h3>
        </div>
      )}

      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-yellow text-cyber-black font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-1 font-bold z-10">
          POPULAR
        </div>
      )}

      {/* Content */}
      <div className="p-5">{children}</div>
    </motion.div>
  );
}
