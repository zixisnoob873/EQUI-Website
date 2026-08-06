"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/pcs", label: "PCs" },
  { href: "/consoles", label: "CONSOLES" },
  { href: "/pricing", label: "PRICING" },
  { href: "/branches", label: "BRANCHES" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/contact", label: "CONTACT" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Equilibrium Gaming Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-[0.15em] text-cyber-gold text-glow-gold group-hover:text-cyber-yellow transition-colors duration-300 leading-none">
                EQUILIBRIUM
              </span>
              <span className="font-mono text-[8px] text-cyber-ghost uppercase tracking-[0.3em] mt-0.5">
                A TIER ABOVE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 font-mono text-xs tracking-widest transition-colors duration-200"
                >
                  <span
                    className={
                      isActive
                        ? "text-cyber-yellow"
                        : "text-cyber-ghost hover:text-cyber-white"
                    }
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1 right-1 h-[2px] bg-cyber-yellow"
                      style={{
                        boxShadow:
                          "0 0 8px rgba(245,166,35,0.6), 0 0 20px rgba(245,166,35,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Location Quick Switch */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/location"
              className="font-mono text-[10px] text-cyber-ghost hover:text-cyber-yellow transition-colors duration-200 uppercase tracking-wider border border-cyber-gunmetal px-3 py-1.5 hover:border-cyber-yellow/50"
            >
              📍 Find Us
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-cyber-yellow"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-cyber-yellow"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-[2px] bg-cyber-yellow"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-cyber-black/95 backdrop-blur-lg border-b border-cyber-yellow/20"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 font-mono text-sm tracking-widest border-l-2 transition-all duration-200 ${
                        isActive
                          ? "border-cyber-yellow text-cyber-yellow bg-cyber-yellow/5"
                          : "border-transparent text-cyber-ghost hover:text-cyber-white hover:border-cyber-gunmetal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
