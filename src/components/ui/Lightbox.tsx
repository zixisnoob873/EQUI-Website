"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption?: string;
}

export function Lightbox({ isOpen, onClose, imageUrl, caption }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cyber-black/90 backdrop-blur-lg p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-cyber-ghost hover:text-cyber-yellow transition-colors font-mono text-sm tracking-widest z-10 border border-cyber-gunmetal hover:border-cyber-yellow px-4 py-2"
            id="lightbox-close"
          >
            ✕ CLOSE
          </button>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-5xl max-h-[85vh] border border-cyber-yellow/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents */}
            <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-cyber-yellow z-10" />
            <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-cyber-yellow z-10" />
            <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-cyber-yellow z-10" />
            <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-cyber-yellow z-10" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={caption || "Gallery image"}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyber-black/80 to-transparent p-4 pt-8">
                <p className="font-mono text-xs text-cyber-ghost tracking-wider">
                  {caption}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
