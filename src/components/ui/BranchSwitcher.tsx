"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import type { BranchSlug } from "@/types";

const BRANCHES: { slug: BranchSlug; label: string; shortLabel: string }[] = [
  { slug: "gulberg-3", label: "GULBERG 3", shortLabel: "G3" },
  { slug: "airline-society", label: "AIRLINE SOCIETY", shortLabel: "AS" },
];

interface BranchSwitcherProps {
  activeBranch: BranchSlug;
  onBranchChange?: (branch: BranchSlug) => void;
  className?: string;
}

export function BranchSwitcher({
  activeBranch,
  onBranchChange,
  className = "",
}: BranchSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSwitch = useCallback(
    (branch: BranchSlug) => {
      if (branch === activeBranch) return;

      // Update URL query param for shareability
      const params = new URLSearchParams(searchParams.toString());
      params.set("branch", branch);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });

      // Notify parent
      onBranchChange?.(branch);
    },
    [activeBranch, onBranchChange, router, pathname, searchParams]
  );

  return (
    <div
      className={`flex items-center gap-0 border border-cyber-gunmetal bg-cyber-black/50 backdrop-blur-sm ${className}`}
      role="tablist"
      aria-label="Select branch"
    >
      {BRANCHES.map((branch) => {
        const isActive = branch.slug === activeBranch;

        return (
          <button
            key={branch.slug}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleSwitch(branch.slug)}
            className={`relative px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer ${
              isActive
                ? "text-cyber-black font-bold"
                : "text-cyber-ghost hover:text-cyber-yellow"
            }`}
            id={`branch-tab-${branch.slug}`}
          >
            {isActive && (
              <motion.div
                layoutId="branch-indicator"
                className="absolute inset-0 bg-cyber-yellow"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 hidden sm:inline">
              {branch.label}
            </span>
            <span className="relative z-10 sm:hidden">
              {branch.shortLabel}
            </span>
          </button>
        );
      })}

      {/* Decorative corner accents */}
      <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-cyber-yellow pointer-events-none" />
      <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-cyber-yellow pointer-events-none" />
    </div>
  );
}

// Hook to read branch from URL search params with fallback
export function useBranchParam(): BranchSlug {
  const searchParams = useSearchParams();
  const branch = searchParams.get("branch") as BranchSlug | null;
  return branch === "airline-society" ? "airline-society" : "gulberg-3";
}
