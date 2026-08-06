"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {/* Decorative line */}
      <div
        className={`flex items-center gap-4 mb-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyber-yellow" />
        <div className="w-2 h-2 bg-cyber-yellow rotate-45" />
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyber-yellow" />
      </div>

      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider text-cyber-white uppercase">
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            className={char === " " ? "" : "inline-block"}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <p className="mt-3 font-mono text-sm text-cyber-ghost tracking-widest uppercase">
          {subtitle}
        </p>
      )}

      {/* Bottom decorative line */}
      <div
        className={`flex items-center gap-2 mt-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-cyber-yellow/50" />
        <div className="h-[1px] w-4 bg-cyber-yellow" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-cyber-yellow/50" />
      </div>
    </motion.div>
  );
}
