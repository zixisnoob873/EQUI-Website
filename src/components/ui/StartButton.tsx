"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface StartButtonProps {
  href?: string;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function StartButton({
  href = "/pcs",
  label = "START GAME",
  onClick,
  className = "",
}: StartButtonProps) {
  const buttonContent = (
    <motion.div
      className={`relative inline-block group cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-1 bg-cyber-yellow/20 blur-md"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Button body */}
      <div className="relative bg-cyber-yellow text-cyber-black font-mono text-sm sm:text-base font-bold tracking-[0.3em] uppercase px-10 py-4 sm:px-14 sm:py-5 border-2 border-cyber-gold transition-all duration-300 group-hover:bg-cyber-gold group-hover:shadow-neon-yellow-intense">
        {/* Corner cuts */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-cyber-black" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyber-black" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />

        {/* Text */}
        <span className="relative z-10 flex items-center gap-3">
          <motion.span
            className="inline-block w-2 h-2 bg-cyber-black"
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {label}
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </span>
      </div>

      {/* Pulsing border animation */}
      <motion.div
        className="absolute inset-0 border-2 border-cyber-yellow pointer-events-none"
        animate={{
          opacity: [0, 0.5, 0],
          scale: [1, 1.05, 1.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );

  if (onClick) {
    return <button onClick={onClick}>{buttonContent}</button>;
  }

  return <Link href={href}>{buttonContent}</Link>;
}
